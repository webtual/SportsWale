import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
  Image,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  black,
  placeholderGrey,
  primary,
  secondary,
  white,
} from "../../constants/Color";
import Translate from "../../translation/Translate";
import { FontSize, MEDIUM, SEMIBOLD } from "../../constants/Fonts";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { goBack, navigate } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import TextInputView from "../../commonComponents/TextInputView";
import {
  UserPlaceholder,
  athlete,
  ic_email,
  ic_mobile,
  ic_password,
} from "../../constants/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { Log } from "../../commonComponents/Log";
import { useFocusEffect } from "@react-navigation/native";
import CommonStyle from "../../commonComponents/CommonStyle";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GOOGLE_API_KEY, SCREEN_WIDTH } from "../../constants/ConstantKey";
import IconButton from "../../commonComponents/IconButton";
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from "@react-native-community/geolocation";
import { useToast } from "native-base";
import { useDispatch } from "react-redux";
import { storeCurrentLocation } from "../../redux/reducers/userReducer";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { BottomModal } from "../../commonComponents/Popup";
import TermandCondition from "../../commonComponents/TermandCondition";

const Register = (props) => {
  const dispatch = useDispatch();
  const refMarker = useRef();
  const toast = useToast();

  const { data } = props?.route?.params ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [conditionModal, setConditionModal] = useState(false);

  const handleTermsPress = () => {
    setConditionModal(true);
    setSelectedSheet("terms");
  };

  const handlePrivacyPolicyPress = () => {
    setConditionModal(true);
    setSelectedSheet("privacy");
  };

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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [CurrentLatitude, setCurrentLatitude] = useState(0);
  const [CurrentLongitude, setCurrentLongitude] = useState(0);

  useEffect(() => {
    requestLocationPermission();
    console.log("data : ", data);
    if (data?.mobile_number) {
      setTxtMobileNo(data?.mobile_number);
    }
  }, []);

  useEffect(() => {
    if (refMarker.current) {
      refMarker.current.animateToRegion(
        {
          latitude: CurrentLatitude,
          longitude: CurrentLongitude,
          latitudeDelta: 0.006594926458930672,
          longitudeDelta: 0.004564784467220306,
        },
        1000
      );
    }
  }, [CurrentLatitude, CurrentLongitude]);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          // {
          //   title: "Location Access Required",
          //   message: "This App needs to Access your location",
          // }
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

          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Alert",
            textBody:
              "Please allow location permission from setting to access your current location.",
            button: "open settings",
            onPressButton: () => {
              Linking.openSettings();
            },
          });
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
        console.log("====================================");
        console.log("Current Location is : " + JSON.stringify(position));
        console.log("====================================");

        refMarker?.current?.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.006594926458930672,
            longitudeDelta: 0.004564784467220306,
          },
          1000
        );

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
          position.coords.longitude
        );
      },
      (error) => {
        console.log("Geolocation error : ", error.message);
      },
      {
        // enableHighAccuracy: false,
        timeout: 500000,
        // maximumAge: 3600000,
      }
    );
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

  const getaddressFromLatLong = async (lat, long, setFieldValue) => {
    Geocoder.from(lat, long)
      .then((json) => {
        var addressComponent = json.results[0];
        console.log("address comp : ", addressComponent);
        if (addressComponent.address_components.length) {
          setFieldValue &&
            setFieldValue("location", addressComponent?.formatted_address);
          setTxtLocation(addressComponent?.formatted_address);
        }
      })
      .catch((error) => console.warn("Geocoder error", error));

    return;

    await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lat +
        "," +
        long +
        "&key=" +
        GOOGLE_API_KEY
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
        );
        if (responseJson.results.length > 0) {
          setFieldValue &&
            setFieldValue(
              "location",
              responseJson.results?.[0].formatted_address
            );
          setTxtLocation(responseJson.results?.[0].formatted_address);
        }
      });
  };

  const registerSchema = Yup.object().shape({
    mobile_number: Yup.string()
      .min(10, "* Please enter valid mobile number")
      .required("* Please enter mobile number"),
    name: Yup.string()
      .min(3, "* Please enter atlease 3 character")
      .required("* Please enter your full name"),
    // location: Yup.string()
    //   .min(3, "* Please enter atlease 3 character")
    //   .required("* Please enter location"),
    dob: Yup.string()
      // .min(10, '* Please enter your password')
      .required("* Please select date of birth"),
    gender: Yup.number().required("* Please select gender"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "* Please accept terms & conditions and privacy policies"
    ),
  });

  const btnRegisterTap = () => {
    navigate("Login");
  };
  return (
    <>
      <HeaderView
        title={Translate.t("registerTxt")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
        HeaderSmall={true}
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
              acceptTerms: true,
              profile_image: null,
            }}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              console.log("values : ", values);

              if (CurrentLatitude && CurrentLongitude) {
                var FinalValue = values;
                FinalValue["isFrom"] = "Register";
                FinalValue["lat"] = CurrentLatitude;
                FinalValue["long"] = CurrentLongitude;
                navigate("OtpView", { data: FinalValue });
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
              values,
              errors,
              touched,
            }) => (
              <View style={{ marginTop: pixelSizeHorizontal(10) }}>
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity onPress={() => UploadImage(setFieldValue)}>
                    <Image
                      source={
                        values.profile_image
                          ? { uri: values.profile_image.path }
                          : UserPlaceholder
                      }
                      style={{
                        width: widthPixel(SCREEN_WIDTH / 3),
                        height: widthPixel(SCREEN_WIDTH / 3),
                        borderRadius: widthPixel(SCREEN_WIDTH / 3),
                        borderColor: white,
                        borderWidth: 5,
                        resizeMode : 'cover'
                      }}
                    />
                  </TouchableOpacity>
                  {values.profile_image && (
                    <View style={{ position: "absolute", right: 0, top: 10 }}>
                      <IconButton
                        onPress={() => setFieldValue("profile_image", null)}
                      >
                        <Icon
                          name={"close-circle"}
                          size={widthPixel(30)}
                          color={black}
                        />
                      </IconButton>
                    </View>
                  )}
                </View>

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
                  error={
                    errors.mobile_number &&
                    touched.mobile_number &&
                    errors.mobile_number
                  }
                />

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
                  placeholder={Translate.t("enter_name")}
                  error={errors.name && touched.name && errors.name}
                />

                <Text
                  style={[
                    CommonStyle.inputTitle,
                    { marginTop: pixelSizeHorizontal(18) },
                  ]}
                >
                  {Translate.t("location")}
                </Text>
                {/* <TextInputView
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  onChangeText={handleChange("location")}
                  value={values.location}
                  placeholder={Translate.t("enter_location")}
                  keyboardType={"default"}
                  error={errors.location && touched.location && errors.location}
                /> */}

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
                          setCurrentLatitude(cord.coordinate.selectedLatitude);
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
                  style={{ marginTop: pixelSizeHorizontal(10) }}
                  data={ArrGender}
                  horizontal
                  ItemSeparatorComponent={<View style={{ width: 12 }} />}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
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

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: pixelSizeHorizontal(20),
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                  >
                    <Icon
                      name={
                        values.acceptTerms
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={20}
                      color={primary}
                    />
                  </TouchableOpacity>
                  {/* <Text
                    style={[
                      CommonStyle.oneLinerText,
                      { marginLeft: pixelSizeHorizontal(10) },
                    ]}
                  >
                    I have read{" "}
                    <Text style={{ textDecorationLine: "underline" }}>
                      terms & conditions
                    </Text>{" "}
                    &{" "}
                    <Text style={{ textDecorationLine: "underline" }}>
                      privacy policy
                    </Text>
                  </Text> */}
                  <View
                    style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}
                  >
                    <Text
                      style={[
                        CommonStyle.oneLinerText,
                        { marginLeft: pixelSizeHorizontal(10) },
                      ]}
                    >
                      I have read{" "}
                    </Text>
                    <TouchableOpacity onPress={handleTermsPress}>
                      <Text
                        style={[
                          CommonStyle.oneLinerText,
                          { textDecorationLine: "underline" },
                        ]}
                      >
                        terms & conditions
                      </Text>
                    </TouchableOpacity>
                    <Text style={[CommonStyle.oneLinerText]}> & </Text>
                    <TouchableOpacity onPress={handlePrivacyPolicyPress}>
                      <Text
                        style={[
                          CommonStyle.oneLinerText,
                          { textDecorationLine: "underline" },
                        ]}
                      >
                        privacy policy
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.acceptTerms &&
                  touched.acceptTerms &&
                  errors.acceptTerms && (
                    <Text
                      style={[
                        CommonStyle.errorText,
                        { marginTop: pixelSizeHorizontal(3) },
                      ]}
                    >
                      {errors.acceptTerms &&
                        touched.acceptTerms &&
                        errors.acceptTerms}
                    </Text>
                  )}

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={handleSubmit}
                  style={[
                    CommonStyle.mainBtnStyle,
                    { marginTop: pixelSizeHorizontal(50) },
                  ]}
                >
                  <Text style={CommonStyle.mainBtnText}>
                    {Translate.t("next")}
                  </Text>
                </TouchableOpacity>

                <BottomModal
                  isVisible={conditionModal}
                  onClose={() => {
                    setConditionModal(false);
                    setSelectedSheet(null);
                  }}
                  title={selectedSheet}
                >
                  {selectedSheet === 'terms' && (
                    <TermandCondition  />
                  )}
                  {selectedSheet === 'privacy' && (
                    <TermandCondition  />
                  )}
                </BottomModal>

                {/* <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    marginVertical: pixelSizeHorizontal(20),
                  }}
                >
                  <Text style={styles.text}>
                    {Translate.t("already_Registered")}
                  </Text>
                  <TouchableOpacity onPress={() => btnRegisterTap()}>
                    <Text style={styles.textSignUp}>
                      {Translate.t("login")}
                    </Text>
                  </TouchableOpacity>
                </View> */}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={(date) => {
                    console.warn("A date has been picked: ", date);
                    setFieldValue("dob", moment(date).format("DD-MM-YYYY"));
                    hideDatePicker();
                  }}
                  onCancel={hideDatePicker}
                />
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
});

export default Register;
