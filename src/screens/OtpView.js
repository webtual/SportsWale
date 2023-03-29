import { View, Text, StyleSheet, Pressable, TouchableOpacity, Platform, Alert, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Translate from '../translation/Translate'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import HeaderView from '../commonComponents/HeaderView'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import { black, greenPrimary, primary, seprator, warmGrey, white } from '../constants/Color'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LoadingView from '../commonComponents/LoadingView'
import ApiManager from '../commonComponents/ApiManager'
import { GET_OTP, LOGIN, REGISTER } from '../constants/ApiUrl'
import { getData, storeData } from '../commonComponents/AsyncManager'
import { BEARER_TOKEN, FCM_TOKEN, USER_DATA } from '../constants/ConstantKey'
import { storeUserData } from '../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/Feather'

const OtpView = ({ route }) => {
    // console.log("OTP SCREEN USER DATA :", route.params.data)

    const [isRegister, setIsRegister] = useState(route.params.isRegister)
    const [i, setIsLoading] = useState(false)
    const [optcode, setOptcode] = useState("")
    const [count, setCount] = useState(60)
    const [isResendCode, setIsResendCode] = useState(true)
    const timerRef = useRef(count);
    var timerId;

    useEffect(() => {

        return () => { clearTimer() }
    }, [])


    const btnSubmitTap = async () => {
        // if (isRegister) {
        //     navigate("ChooseIntrest")
        // }
        // else {
            resetScreen("Dashboard")
        // }
    }

    // Action Methods

    const btnResendTap = () => {
        setOptcode('')
    }

    const clearTimer = () => {
        for (var i = 0; i < 10000; i++) {
            clearInterval(i)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { marginHorizontal: pixelSizeHorizontal(20) }]}>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: pixelSizeHorizontal(20) }}>
                        <IconButton
                            additionalStyle={{ marginLeft: pixelSizeHorizontal(-10), }}
                            onPress={() => goBack()}>
                            <Icon name={"arrow-left"} size={24} color={black} />
                        </IconButton>
                        <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_22, color: black }}>Enter OTP  <Text style={{ color: primary }}>{Translate.t("app_name")}</Text></Text>
                    </View>

                    <View style={styles.otpView}>
                        <OTPInputView
                            style={{ flex: 1, height: heightPixel(55) }}
                            pinCount={6}
                            code={optcode}
                            onCodeChanged={code => { setOptcode(code) }}
                            autoFocusOnLoad={false}
                            codeInputFieldStyle={styles.borderStyleBase}
                            codeInputHighlightStyle={styles.borderStyleHighLighted}
                            onCodeFilled={(code) => {

                                setOptcode(code)
                                console.log(`Code is ${code}, you are good to go!`)
                            }}
                        />
                    </View>


                    <Pressable
                        onPress={() => btnSubmitTap()}
                        style={styles.btnStyle}>
                        <Text style={styles.btnText}>{Translate.t("submit")}</Text>

                    </Pressable>


                    <View style={{ alignSelf: 'center', marginTop: pixelSizeHorizontal(25) }}>
                        <Text style={styles.textDesc}>
                            {Translate.t("otp_desc")}
                        </Text>
                        {isResendCode ?
                            <TouchableOpacity style={{ marginTop: pixelSizeHorizontal(12) }}
                                onPress={() => { btnResendTap() }} >

                                <Text style={styles.textResend}>
                                    {Translate.t("resend_otp")}
                                </Text>

                            </TouchableOpacity>
                            :
                            <Text style={[styles.textResend, { color: warmGrey, marginTop: pixelSizeHorizontal(10) }]}>
                                Resend OTP in 00:{count}
                            </Text>}
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: white
    },
    btnStyle: {
        backgroundColor: primary,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthPixel(8),
    },
    btnText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_22,
        textTransform: 'uppercase',
    },
    textDesc: {
        color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16
    },
    textResend: {
        color: primary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16,
        textAlign: 'center',
    },
    otpView: {
        alignItems: 'center',
        marginVertical: pixelSizeHorizontal(40)
    },
    borderStyleBase: {
        borderWidth: 2, borderColor: seprator, height: heightPixel(55),
        fontSize: FontSize.FS_22, fontFamily: REGULAR, borderRadius: 5,
        color: black,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: seprator,
        marginHorizontal: 5
    },
    borderStyleHighLighted: {
        borderColor: primary, fontSize: FontSize.FS_22, height: heightPixel(55),
        fontFamily: REGULAR,
        color: black,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default OtpView