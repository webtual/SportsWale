import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
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
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import IconButton from "../../commonComponents/IconButton";
import ImagePicker from "react-native-image-crop-picker";

const Register = (props) => {

  const {data} = props?.route?.params ?? {}
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // if (Platform.OS === "android") {
      //     getFCMToken()
      // }
      // else {
      //     requestUserPermission()
      // }
    }, [])
  );

  useEffect(() => {
    console.log("data : ",data)
    if(data?.mobile_number){
      setTxtMobileNo(data?.mobile_number)
    }
  },[])

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

  const registerSchema = Yup.object().shape({
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
              //   loginData(values);
              var FinalValue = values
              FinalValue["isFrom"] = "Register"
              navigate("OtpView",{data : FinalValue})
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
                 
                    <FastImage
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
                      }}
                      resizeMode="cover"
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
                <TextInputView
                  containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
                  onChangeText={handleChange("location")}
                  value={values.location}
                  placeholder={Translate.t("enter_location")}
                  keyboardType={"default"}
                  error={errors.location && touched.location && errors.location}
                />

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
                  <Text
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
                  </Text>
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

                <View
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
                </View>
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
