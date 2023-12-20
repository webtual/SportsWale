import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { useCallback, useState } from 'react';
import { black, secondary } from '../../constants/Color';
import Translate from '../../translation/Translate'
import { FontSize, MEDIUM, SEMIBOLD } from '../../constants/Fonts';
import { pixelSizeHorizontal } from '../../commonComponents/ResponsiveScreen';
import { navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_email, ic_mobile, ic_password } from '../../constants/Images';
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Log } from '../../commonComponents/Log'
import { useFocusEffect } from '@react-navigation/native'
import CommonStyle from '../../commonComponents/CommonStyle'


const Register = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [txtMobile, setTxtMobile] = useState("")
    const [txtEmail, setTextEmail] = useState("")
    const [txtPassword, setTxtPassword] = useState("")


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
            .min(10, '* Please enter 10 digit mobile number')
            .required("* Please enter mobile number"),
        email: Yup.string()
            .required("* Please enter email address"),
        password: Yup.string()
            // .min(10, '* Please enter your password')
            .required("* Please enter your password"),
    });

    const loginData = (value) => {
        Log("MOBILE NUMBER :", value)
        setTxtMobile(value.mobile)
        navigate('OtpView', { isRegister: false })
        // Api_Check_mobile(true, value)
    }

    const btnRegisterTap = () => {
        navigate('Login')
    }
    return (
        <ScrollView>
            <HeaderView title={Translate.t("registerTxt")} isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            mobile: txtMobile,
                            email: txtEmail,
                            password: txtPassword
                        }}
                        validationSchema={MobileSchema}
                        onSubmit={values => { loginData(values) }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={{ marginTop: pixelSizeHorizontal(30) }}>

                                <TextInputView
                                    imageSource={ic_mobile}
                                    onChangeText={handleChange('mobile')}
                                    // onBlurEffect={handleBlur('mobile')}
                                    value={values.mobile}
                                    placeholder={Translate.t("mobile")}
                                    maxLength={10}
                                    keyboardType={'number-pad'}
                                    error={(errors.mobile && touched.mobile) && errors.mobile}
                                />
                                  <View style={{ marginTop: pixelSizeHorizontal(10) }}>
                                 <TextInputView
                                    imageSource={ic_email}
                                    onChangeText={handleChange('mobile')}
                                    // onBlurEffect={handleBlur('mobile')}
                                    value={values.email}
                                    placeholder={Translate.t("email")}
                                    maxLength={10}
                                    keyboardType={'number-pad'}
                                    error={(errors.email && touched.email) && errors.email}
                                />
                                </View>
                                 <TextInputView
                                    imageSource={ic_password}
                                    onChangeText={handleChange('mobile')}
                                    // onBlurEffect={handleBlur('mobile')}
                                    value={values.password}
                                    placeholder={Translate.t("password")}
                                    maxLength={10}
                                    keyboardType={'default'}
                                    error={(errors.password && touched.password) && errors.password}
                                />
                                <TouchableOpacity activeOpacity={0.7}
                                    onPress={handleSubmit}
                                    style={CommonStyle.mainBtnStyle}>
                                    <Text style={CommonStyle.mainBtnText}>{Translate.t("registerTxt")}</Text>

                                </TouchableOpacity>

                                <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: pixelSizeHorizontal(20) }}>
                                    <Text style={styles.text}>
                                        {Translate.t("already_Registered")}
                                    </Text>
                                    <TouchableOpacity onPress={() => btnRegisterTap()}>
                                        <Text style={styles.textSignUp}>
                                            {Translate.t("login")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        )}
                    </Formik>
                </View>
            </HeaderView>
            {isLoading && <LoadingView />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    textSignUp: {
        color: secondary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16
    },
    text: {
        color: black, fontFamily: MEDIUM, fontSize: FontSize.FS_16
    },
})

export default Register