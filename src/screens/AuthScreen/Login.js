import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useCallback, useState } from "react";
import { black, secondary } from "../../constants/Color";
import Translate from "../../translation/Translate";
import { FontSize, MEDIUM, SEMIBOLD } from "../../constants/Fonts";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import { navigate } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import TextInputView from "../../commonComponents/TextInputView";
import { ic_mobile } from "../../constants/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { Log } from "../../commonComponents/Log";
import { useFocusEffect } from "@react-navigation/native";
import CommonStyle from "../../commonComponents/CommonStyle";
import ApiManager from "../../commonComponents/ApiManager";
import { LOGIN } from "../../constants/ApiUrl";

const Login = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [txtMobile, setTxtMobile] = useState("");

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

  const MobileSchema = Yup.object().shape({
    mobile: Yup.string()
      .min(10, "* Please enter 10 digit mobile number")
      .required("* Please enter mobile number"),
  });

  const loginData = (value) => {
    Log("MOBILE NUMBER :", value);
    setTxtMobile(value.mobile);
    // navigate('OtpView',{isRegister: false})
    // Api_Check_mobile(true, value)
    Api_Check_mobile(true, value);
  };

  const btnRegisterTap = () => {
    navigate("RegisterName");
  };

  // const loginData = (value) => {
  //     // console.log("value", value)
  //     setMobile(value.mobile)
  //     Api_Check_mobile(true, value)
  // }

  const Api_Check_mobile = (isLoad, data) => {
    setIsLoading(isLoad);

    const loginData = {
      username: "test112@yopmail.com",
      password: "123456",
      latitude: 72.0,
      longitude: 27.0,
      token: "abc",
      devicetype: "android",
      apikey: "123456",
    };

    const formData = new FormData();
    formData.append("username", loginData.username);
    formData.append("password", loginData.password);
    formData.append("latitude", loginData.latitude.toString());
    formData.append("longitude", loginData.longitude.toString());
    formData.append("token", loginData.token);
    formData.append("devicetype", loginData.devicetype);
    formData.append("apikey", loginData.apikey);

    console.log("API",LOGIN,formData);
    ApiManager.post(LOGIN, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    ApiManager.post(LOGIN, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Check_mobile : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var dict = data;
          dict["isFrom"] = "Login";
          navigate("OtpView", { data: dict });
        } else {
          if (response.data.is_active === 0) {
            Alert.alert("Otp_Check_mobile");
          } else {
            navigate("Register", { mobile: data.mobile });
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Check_mobile Error ", err);
      });
  };
  return (
    <>
      <HeaderView
        title={Translate.t("login")}
        isBack={false}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginTop: 20 }}>
          <Formik
            enableReinitialize
            initialValues={{
              mobile: txtMobile,
            }}
            validationSchema={MobileSchema}
            onSubmit={(values) => {
              loginData(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{ marginTop: pixelSizeHorizontal(60) }}>
                <TextInputView
                  imageSource={ic_mobile}
                  onChangeText={handleChange("mobile")}
                  // onBlurEffect={handleBlur('mobile')}
                  value={values.mobile}
                  placeholder={Translate.t("mobile")}
                  maxLength={10}
                  keyboardType={"number-pad"}
                  error={errors.mobile && touched.mobile && errors.mobile}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                  style={CommonStyle.mainBtnStyle}
                >
                  <Text style={CommonStyle.mainBtnText}>
                    {Translate.t("login")}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    marginTop: pixelSizeHorizontal(20),
                  }}
                >
                  <Text style={styles.text}>
                    {Translate.t("dont_have_account")}
                  </Text>
                  <TouchableOpacity onPress={() => btnRegisterTap()}>
                    <Text style={styles.textSignUp}>
                      {Translate.t("register")}
                    </Text>
                  </TouchableOpacity>
                </View>
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
    fontSize: FontSize.FS_16,
  },
  text: {
    color: black,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_16,
  },
});

export default Login;
