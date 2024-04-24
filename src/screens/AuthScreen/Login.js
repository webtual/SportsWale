import { View, Text, StyleSheet, TouchableOpacity, Alert, Keyboard } from "react-native";
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
import { CHECK_MOBILE, LOGIN } from "../../constants/ApiUrl";
import CallSVG from "../../assets/images/CallSVG";
import { useToast } from "native-base";

const Login = ({}) => {

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
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
    mobile_number: Yup.string()
      .min(10, "* Please enter valid mobile number")
      .required("* Please enter mobile number"),
  });

  const loginData = (value) => {
    Keyboard.dismiss()
    setTxtMobile(value.mobile);
    Api_Check_mobile(true, value);
  };

  const btnRegisterTap = () => {
    // navigate("Dashboard");
    navigate("Register");
  };

  const Api_Check_mobile = (isLoad, data) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("mobile_number", data.mobile_number);

    ApiManager.post(CHECK_MOBILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Check_mobile : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status == true) {
          var dict = {
            isFrom : "Login",
            mobile_number : data.mobile_number
          };
          navigate("OtpView", { data: dict });
        } else {

          toast.show({
            description:response.data.message
          })
          var dict = {
            mobile_number : data.mobile_number
          };
          navigate("Register", { data: dict });
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
              mobile_number: txtMobile,
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
                  icon={<CallSVG />}
                  onChangeText={handleChange("mobile_number")}
                  value={values.mobile_number}
                  placeholder={Translate.t("enter_phone_number")}
                  maxLength={10}
                  keyboardType={"number-pad"}
                  error={errors.mobile_number && touched.mobile_number && errors.mobile_number}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                  style={[
                    CommonStyle.mainBtnStyle,
                    { marginTop: pixelSizeHorizontal(50) },
                  ]}
                >
                  <Text style={CommonStyle.mainBtnText}>
                    {Translate.t("login")}
                  </Text>
                </TouchableOpacity>

                {/* <View
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
                </View> */}
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

export default Login;
