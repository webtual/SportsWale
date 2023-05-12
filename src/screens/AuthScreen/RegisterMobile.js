
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, secondary, warmGrey, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_mobile, ic_user } from '../../constants/Images'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Log } from '../../commonComponents/Log'
import { useFocusEffect } from '@react-navigation/native'
import CommonStyle from '../../commonComponents/CommonStyle'


const RegisterMobile = ({}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [mobile, setMobile] = useState("")


    useFocusEffect(
        useCallback(() => {
            // if (route?.params?.mobile !== "" && route?.params?.mobile !== undefined) {
            //     setMobile(route?.params?.mobile)
            // }
            // else {
            //     setMobile("")
            // }
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
    });

    const loginData = (value) => {
        Log("MOBILE NUMBER :", value)
        setMobile(value.mobile)
        navigate('OtpView',{isRegister: true})
        // Api_Check_mobile(true, value)
    }

    const btnRegisterTap = () =>{
        navigate('RegisterName')
    }
    return (
        <>
            <HeaderView title={Translate.t("phone_number")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20),}}>
            <View style={{marginTop:20}}>
            <Formik
                    enableReinitialize
                    initialValues={{
                        mobile: mobile,
                    }}
                    validationSchema={MobileSchema}
                    onSubmit={values => { loginData(values) }
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginTop: pixelSizeHorizontal(60) }}>

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
                            <TouchableOpacity activeOpacity={0.7}   
                                onPress={handleSubmit}
                                style={CommonStyle.mainBtnStyle}>
                                <Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>

                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                </View>
            </HeaderView>
            {isLoading && <LoadingView />}
        </>
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

export default RegisterMobile