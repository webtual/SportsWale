import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  black,
  black05,
  border,
  grey,
  light_grey,
  offWhite,
  placeholderGrey,
  primary,
  secondary,
  warmGrey,
  white,
} from "../../constants/Color";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Translate from "../../translation/Translate";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import IconButton from "../../commonComponents/IconButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderView from "../../commonComponents/HeaderView";

import {
  UserPlaceholder,
  athlete,
  booking,
  control,
  goodFeedback,
  help,
  ic_gift,
  wallet,
} from "../../constants/Images";
import { Colors } from "../../constants/CustomeColor";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCurrentLocation,
  storeUserData,
  user_data,
} from "../../redux/reducers/userReducer";
import { useToast } from "native-base";
import Geolocation from "@react-native-community/geolocation";
import ImagePicker from "react-native-image-crop-picker";

import { Formik } from "formik";
import * as Yup from "yup";
import { LOCATION_CORDS, SCREEN_WIDTH, USER_DATA } from "../../constants/ConstantKey";
import TextInputView from "../../commonComponents/TextInputView";
import CommonStyle from "../../commonComponents/CommonStyle";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_PROFILE, UPDATE_PROFILE } from "../../constants/ApiUrl";
import LoadingView from "../../commonComponents/LoadingView";
import moment from "moment";
import Feather from "react-native-vector-icons/Feather";
import { storeData } from "../../commonComponents/AsyncManager";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { getFileNameFromPath } from "../../commonComponents/Utils";

const Profile = () => {
  const refMarker = useRef();

  const toast = useToast();
  const userData = useSelector(user_data);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const ArrGender = [
    {
      id: 1,
      value: "Male",
    },
    {
      id: 2,
      value: "Female",
    },
    {
      id: 3,
      value: "Other",
    },
  ];

  const [txtMobileNo, setTxtMobileNo] = useState("");
  const [txtName, setTxtName] = useState("");
  const [txtGender, setTxtGender] = useState(ArrGender[0].id);
  const [txtDob, setDob] = useState("");
  const [txtLocation, setTxtLocation] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [CurrentLatitude, setCurrentLatitude] = useState(0.0);
  const [CurrentLongitude, setCurrentLongitude] = useState(0.0);

  const [isEditProfile, setIsEditProfile] = useState(false);

  useEffect(() => {
    // requestLocationPermission();
    Api_Get_Profile(true);
  }, []);


  useEffect(() => {
    
    setTimeout(() => {
      console.log("use effect call for map pin navigate : ",CurrentLatitude," longitude : ",CurrentLongitude)
      refMarker?.current?.animateToRegion(
        {
          latitude: CurrentLatitude,
          longitude: CurrentLongitude,
          latitudeDelta: 0.006594926458930672,
          longitudeDelta: 0.004564784467220306,
        },
        500
      );
    
    }, 1000);
   
  }, [CurrentLatitude, CurrentLongitude]);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          console.log("====================================");
          console.log("Permission Granted");
          console.log("====================================");
        } else {
          console.log("====================================");
          console.log("Permission Denied");
          console.log("====================================");
        }
      } catch (err) {
        // Api_GetContacts(true);
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // console.log('====================================');
        // console.log('Current Location is : ' + JSON.stringify(position));
        // console.log('====================================');

        dispatch(
          storeCurrentLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        );
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);

        getaddressFromLatLong(
          position.coords.latitude,
           position.coords.longitude,
        );
      },
      (error) => {
        console.log("Geolocation error : ", error.message);
      },
      {
        // enableHighAccuracy: false,
        timeout: 200000,
        // maximumAge: 3600000,
      }
    );
  };

  const Api_Get_Profile = (isLoad) => {
    setIsLoading(isLoad);
    ApiManager.get(GET_PROFILE + userData?.id, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Profile : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var profile_data = response.data.data;

          storeData(USER_DATA, profile_data, () => {
            dispatch(storeUserData(profile_data));
          });

          setProfileData(profile_data);

          setTxtName(profile_data?.first_name + " " + profile_data?.last_name);
          setDob(moment(profile_data?.dob).format("DD-MM-YYYY"));
          setTxtLocation(profile_data?.player?.location);
          setTxtMobileNo(profile_data?.mobile);
          setTxtGender(profile_data?.gender);
          if (profile_data?.profile) {
            setProfileImg({
              path: userData?.asset_url + profile_data?.profile,
            });
          }

          if (profile_data?.player) {
            setCurrentLatitude(Number(profile_data?.player?.latitude) || 0.0);
            setCurrentLongitude(Number(profile_data?.player?.longitude) || 0.0);
            getaddressFromLatLong(
              profile_data?.player?.latitude,
              profile_data?.player?.longitude
            );
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Profile Error ", err);
      });
  };

  const Api_Update_profile = (isLoad, profile_data) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("name", profile_data?.name);
    formData.append("email", "");
    formData.append("gender", profile_data?.gender);

    formData.append("dob", profile_data?.dob);
    formData.append("location", profile_data?.location);
    formData.append("latitude", profile_data?.lat);
    formData.append("longitude", profile_data?.long);
    formData.append("bio", "");
    // formData.append("device_type", Platform.OS == 'android' ? 1 : 2);
    // formData.append("token", "1234567890");
    if (profileImg?.mime) {
      formData.append("profile_image", {
        uri: profileImg?.path,
        name: Platform.OS == "android" ? "image.png" : profileImg.filename,
        type: profileImg?.mime,
      });
    }

    ApiManager.put(UPDATE_PROFILE + userData?.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Update_profile : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          toast.show({
            description: response.data.message,
          });

          storeData(LOCATION_CORDS,{
            lat: profile_data?.lat,
            long: profile_data?.long,
          })

          dispatch(
            storeCurrentLocation({
              lat: profile_data?.lat,
              long: profile_data?.long,
            })
          );

          Api_Get_Profile(true);
          setIsEditProfile(false);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Update_profile Error ", err);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const UploadImage = (setFieldValue) => {
    Alert.alert("Upload Picture", "Upload your profile picture", [
      {
        text: "Gallery",
        onPress: () => {
          setIsLoading(true);
          ImagePicker.openPicker({
            freeStyleCropEnabled: true,
            cropping: true,
            mediaType: "photo",
            includeBase64: false,
            compressImageQuality: 0.8,
          })
            .then((images) => {
              // console.log("Selected Image  " + JSON.stringify(images))

              setFieldValue("profile_image", images);
              setProfileImg(images);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
        },
      },
      {
        text: "Camera",
        onPress: () => {
          setIsLoading(true);
          ImagePicker.openCamera({
            cropping: true,
            mediaType: "photo",
            includeBase64: false,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
          })
            .then((images) => {
              console.log("Selected Image : " + JSON.stringify(images));
              setIsLoading(false);
              setProfileImg(images);
              setFieldValue("profile_image", images);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
        },
        style: "default",
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "destructive",
      },
    ]);
  };

  const profileSchema = Yup.object().shape({
    mobile_number: Yup.string()
      .min(10, "* Please enter valid mobile number")
      .required("* Please enter mobile number"),
    name: Yup.string()
      .min(3, "* Please enter atlease 3 character")
      .required("* Please enter your full name"),
    location: Yup.string()
      .min(3, "* Please enter atlease 3 character")
      .required("* Please enter location"),
    dob: Yup.string()
      // .min(10, '* Please enter your password')
      .required("* Please select date of birth"),
    gender: Yup.number().required("* Please select gender"),
    // acceptTerms: Yup.bool().oneOf(
    //   [true],
    //   "* Please accept terms & conditions and privacy policies"
    // ),
  });

  const btnCancelTap = () => {
    setIsEditProfile(!isEditProfile);
    setTxtName(profileData?.first_name + " " + profileData?.last_name);
    setDob(moment(profileData?.dob).format("DD-MM-YYYY"));
    setTxtLocation(profileData?.player?.location);
    setTxtMobileNo(profileData?.mobile);
    setTxtGender(profileData?.gender);
    if (profileData?.profile) {
      setProfileImg({ path: userData?.asset_url + profileData?.profile });
    }
  };

  const getaddressFromLatLong = async (lat, long, setFieldValue) => {
    Geocoder.from(lat, long)
      .then((json) => {
        var addressComponent = json.results[0];

        if (addressComponent.address_components.length) {
          setFieldValue &&
            setFieldValue("location", addressComponent?.formatted_address);
          setTxtLocation(addressComponent?.formatted_address);
        }
      })
      .catch((error) => console.warn("Geocoder error", error));
  };

  const btnUpdateTap = (final_data) => {
    console.log(
      "getFileNameFromPath : ",
      final_data?.profile_image?.path.split("\\").pop().split("/").pop()
    );
    Api_Update_profile(true, final_data);
  };

  return (
    <>
      <HeaderView
        title={
          isEditProfile ? Translate.t("edit_profile") : Translate.t("profile")
        }
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
        HeaderSmall={true}
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isEditProfile && (
              <IconButton
                additionalStyle={{}}
                onPress={() => {
                  setIsEditProfile(true);
                }}
              >
                <Feather name={"edit"} size={24} color={white} />
              </IconButton>
            )}
          </View>
        }
      >
        <View style={{ marginTop: 20 }}>
          <Formik
            enableReinitialize
            initialValues={{
              mobile_number: txtMobileNo,
              name: txtName,
              location: txtLocation,
              dob: txtDob,
              gender: txtGender,
              // acceptTerms: true,
              profile_image: profileImg,
            }}
            validationSchema={profileSchema}
            onSubmit={(values) => {
              console.log("values : ", values);

              if (CurrentLatitude && CurrentLongitude) {
                var FinalValue = values;
                FinalValue["lat"] = CurrentLatitude;
                FinalValue["long"] = CurrentLongitude;

                btnUpdateTap(FinalValue);
                // navigate("OtpView", { data: FinalValue });
              } else {
                toast.show({
                  description:
                    "Please allow location permission, we required your current location",
                });
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              resetForm,
              values,
              errors,
              touched,
            }) => (
              <View style={{ marginTop: pixelSizeHorizontal(10) }}>
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity
                    onPress={() => isEditProfile && UploadImage(setFieldValue)}
                    disabled={!isEditProfile}
                  >
                  
                    {profileImg?.path ? (
                      <Image
                        source={{ uri: profileImg?.path }}
                        style={styles.image}
                      />
                    ) : (
                      <Image
                        source={UserPlaceholder}
                        style={[styles.image, {resizeMode : 'cover'}]}
                      />
                    )}
                  </TouchableOpacity>
                  {/* {values.profile_image && isEditProfile && (
                    <View style={{ position: "absolute", right: 0, top: 10 }}>
                      <IconButton
                        onPress={() => setProfileImg(null)}
                      >
                        <Icon
                          name={"close-circle"}
                          size={widthPixel(30)}
                          color={black}
                        />
                      </IconButton>
                    </View>
                  )} */}
                </View>

                  {!isEditProfile ? 
                  <>
                <Text
                  style={[
                    CommonStyle.inputTitle,
                    { marginTop: pixelSizeHorizontal(18) },
                  ]}
                >
                  {Translate.t("mobile_number")}
                </Text>
                <TextInputView
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  onChangeText={handleChange("mobile_number")}
                  value={values.mobile_number}
                  placeholder={Translate.t("enter_mobile_number")}
                  keyboardType={"number-pad"}
                  maxLength={10}
                  editable={false}
                  error={
                    errors.mobile_number &&
                    touched.mobile_number &&
                    errors.mobile_number
                  }
                />
                </> : null}

                <Text
                  style={[
                    CommonStyle.inputTitle,
                    { marginTop: pixelSizeHorizontal(18) },
                  ]}
                >
                  {Translate.t("enter_full_name")}
                </Text>
                <TextInputView
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  editable={isEditProfile}
                  placeholder={Translate.t("enter_name")}
                  error={errors.name && touched.name && errors.name}
                />

                {/* <Text
                style={[
                  CommonStyle.inputTitle,
                  { marginTop: pixelSizeHorizontal(18) },
                ]}
              >
                {Translate.t("location")}
              </Text>
              <TextInputView
                containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                onChangeText={handleChange("location")}
                value={values.location}
                editable={isEditProfile}
                placeholder={Translate.t("enter_location")}
                keyboardType={"default"}
                error={errors.location && touched.location && errors.location}
              /> */}

                <Text
                  style={[
                    CommonStyle.inputTitle,
                    { marginTop: pixelSizeHorizontal(18) },
                  ]}
                >
                  {Translate.t("location")}
                </Text>
                <View style={{ marginTop: pixelSizeHorizontal(10) }}>
                  <MapView
                    scrollEnabled={false}
                    ref={refMarker}
                    zoomEnabled={false}
                    zoomControlEnabled={false}
                    showsUserLocation={false}
                    style={{ width: "100%", height: 180 }}
                    provider={PROVIDER_GOOGLE}
                    followsUserLocation={true}
                    showsMyLocationButton={false}
                    initialRegion={{
                      latitude: CurrentLatitude,
                      longitude: CurrentLongitude,
                      latitudeDelta: 0.006594926458930672,
                      longitudeDelta: 0.004564784467220306,
                    }}
                    //   onRegionChangeComplete={onRegionChange}
                    // onRegionChange={onRegionChange}
                  >
                    <Marker
                      //   key={index}
                      tappable={false}
                      coordinate={{
                        latitude: CurrentLatitude,
                        longitude: CurrentLongitude,
                      }}
                      title={"Your Selected Location"}
                      description={values?.location}
                    />
                  </MapView>
                  {isEditProfile && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: primary,
                        borderRadius: pixelSizeHorizontal(5),
                        paddingVertical: pixelSizeHorizontal(8),
                        marginTop: pixelSizeHorizontal(10),
                      }}
                      onPress={() => {
                        navigate("LocationMap", {
                          lat: CurrentLatitude,
                          long: CurrentLongitude,
                          onSelectLocation: (cord) => {
                            console.log("cord : ", cord);
                            setCurrentLatitude(
                              cord.coordinate.selectedLatitude
                            );
                            setCurrentLongitude(
                              cord.coordinate.selectedLongitude
                            );
                            getaddressFromLatLong(
                              cord.coordinate.selectedLatitude,
                              cord.coordinate.selectedLongitude,
                              setFieldValue
                            );
                          },
                        });
                      }}
                    >
                      <Text
                        style={[
                          CommonStyle.textInputStyle,
                          {
                            color: white,
                            textAlign: "center",
                          },
                        ]}
                      >
                        Select your location
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text
                  style={[
                    CommonStyle.inputTitle,
                    { marginTop: pixelSizeHorizontal(18) },
                  ]}
                >
                  {Translate.t("date_of_birth")}
                </Text>
                <TouchableOpacity
                  disabled={!isEditProfile}
                  onPress={() => {
                    showDatePicker();
                  }}
                  style={{
                    marginTop: pixelSizeHorizontal(10),
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: white,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: pixelSizeHorizontal(10),
                    }}
                  >
                    <Text
                      style={[
                        CommonStyle.textInputStyle,
                        {
                          color:
                            values.dob.length <= 0 ? placeholderGrey : black,
                        },
                      ]}
                    >
                      {values.dob.length <= 0
                        ? Translate.t("select_date_of_birth")
                        : values.dob}
                    </Text>
                  </View>
                </TouchableOpacity>
                {errors.dob && touched.dob && errors.dob && (
                  <Text
                    style={[
                      CommonStyle.errorText,
                      { marginTop: pixelSizeHorizontal(3) },
                    ]}
                  >
                    {errors.dob && touched.dob && errors.dob}
                  </Text>
                )}

                <Text
                  style={[
                    CommonStyle.inputTitle,
                    { marginTop: pixelSizeHorizontal(18) },
                  ]}
                >
                  {Translate.t("gender")}
                </Text>
                <FlatList
                  style={[
                    { marginTop: pixelSizeHorizontal(10) },
                    !isEditProfile && { marginBottom: pixelSizeHorizontal(10) },
                  ]}
                  data={ArrGender}
                  horizontal
                  ItemSeparatorComponent={<View style={{ width: 12 }} />}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={!isEditProfile}
                        style={{
                          paddingVertical: pixelSizeHorizontal(8),
                          paddingHorizontal: pixelSizeHorizontal(24),
                          borderRadius: pixelSizeHorizontal(25),
                          backgroundColor:
                            values.gender == item.id ? primary : white,
                        }}
                        onPress={() => setFieldValue("gender", item.id)}
                      >
                        <Text
                          style={[
                            CommonStyle.textInputStyle,
                            {
                              color: values.gender == item.id ? white : black,
                            },
                          ]}
                        >
                          {item.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                {isEditProfile && (
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: pixelSizeHorizontal(50),
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        resetForm();
                        btnCancelTap();
                      }}
                      style={[
                        CommonStyle.mainBtnStyle,
                        {
                          flex: 1,
                          marginRight: pixelSizeHorizontal(20),
                          borderWidth: 1,
                          borderColor: border,
                          backgroundColor: white,
                        },
                      ]}
                    >
                      <Text style={[CommonStyle.mainBtnText, { color: black }]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={handleSubmit}
                      style={[CommonStyle.mainBtnStyle, { flex: 2 }]}
                    >
                      <Text style={CommonStyle.mainBtnText}>
                        {Translate.t("update_profile")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {isDatePickerVisible && (
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={moment(values?.dob, "DD-MM-YYYY").toDate()}
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                      console.warn("A date has been picked: ", date);
                      hideDatePicker();
                      setFieldValue("dob", moment(date).format("DD-MM-YYYY"));
                    }}
                    onCancel={hideDatePicker}
                  />
                )}
              </View>
            )}
          </Formik>
        </View>
      </HeaderView>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  textSignUp: {
    color: secondary,
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_14,
  },
  text: {
    color: black,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
  },
  image: {
    width: widthPixel(SCREEN_WIDTH / 3),
    height: widthPixel(SCREEN_WIDTH / 3),
    borderRadius: widthPixel(SCREEN_WIDTH / 3),
    borderColor: white,
    borderWidth: 5,
  },
});

export default Profile;
