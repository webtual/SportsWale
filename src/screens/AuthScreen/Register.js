import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
import Geolocation from '@react-native-community/geolocation';
import { REGISTER } from '../../constants/ApiUrl';
import ApiManager from '../../commonComponents/ApiManager';
import { storeData } from '../../commonComponents/AsyncManager';
import { IS_REGISTER, USER_DATA } from '../../constants/ConstantKey';
import { storeUserData } from '../../redux/reducers/userReducer';
import { Toast, useToast } from 'native-base';
import { useDispatch } from 'react-redux';

const Register = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [txtMobile, setTxtMobile] = useState("")
    const [txtEmail, setTextEmail] = useState("")
    const [txtPassword, setTxtPassword] = useState("")
    const [Longitude, setLongitude] = useState('');
    const [Latitude, setLatitude] = useState('');
const dispatch = useDispatch()
    useFocusEffect(
        useCallback(() => {
            getOneTimeLocation()
        }, [])
    );



    const loginData = (value) => {
        setTxtMobile(value.mobile)
        setTextEmail(value.email)
        setTxtPassword(value.password)
        Api_Register(true, value)
    }
    const Api_Register = (isLoad, data) => {
        setIsLoading(isLoad)
        ApiManager.post(REGISTER, {
            apikey: '123',
            email: data?.email,
            mobile: data?.mobile,
            password: data?.password,
            latitude: Latitude ? Latitude : 0,
            longitude: Longitude ? Longitude : 0,
        }).then((response) => {
            setIsLoading(false)
            var data = response.data;
            Log("REGISTER RESPONSE :", data)
            if (data.Status == 1) {

                var user_data = data.Data[0] //JSON.parse(data.Data)[0]
                storeData(USER_DATA, user_data, () => {
                    dispatch(storeUserData(user_data))
                })
                navigate("RegisterName")
                storeData(IS_REGISTER, true)
                Toast.show({
                    description: data?.Msg
                })
            } else {
                Toast.show({
                    description: data?.Msg
                })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_login Error ", err);
        })
    }
    const Api_Get_profile_check = (isLoad,) => {
        setIsLoading(isLoad)
        ApiManager.post(REGISTER, {
            apikey: '123',
            users_id: "",
        }).then((response) => {
            setIsLoading(false)
            var data = response.data;
            Log("GET PROFILE RESPONSE :", data)
            if (data.Status == 1) {
                navigate("RegisterName", { isRegister: true })
                Toast.show({
                    description: data?.Msg
                })


            } else {
                Toast.show({
                    description: data?.Msg
                })
            }

        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_profile_check Error ", err);
        })
    }
    const MobileSchema = Yup.object().shape({
        mobile: Yup.string()
            .min(10, '* Please enter 10 digit mobile number')
            .required("* Please enter mobile number"),
        email: Yup.string()
            .required("* Please enter email address"),
        password: Yup.string()
            .required("* Please enter your password"),
    });

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                Log("Current Position is : " + JSON.stringify(position.coords))
                const currentLatitude = JSON.stringify(position.coords.latitude);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                setLatitude(currentLatitude);
                setLongitude(currentLongitude);
            },
            (error) => {
                Log("Location get Error : " + error.message)
                Alert.alert(
                    "Location Alert",
                    error.message,
                    [
                        { text: 'Cancel', onPress: () => Log('Cancel Pressed'), style: 'destructive' },
                        {
                            text: 'Retry',
                            onPress: () => {
                                getOneTimeLocation()
                            }
                        },
                    ],
                    { cancelable: true }
                );
            },
            {
                enableHighAccuracy: false,
                timeout: 100000,
                maximumAge: 10000
            },
        );
    };

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
                                        onChangeText={handleChange('email')}
                                        // onBlurEffect={handleBlur('mobile')}
                                        value={values.email}
                                        placeholder={Translate.t("email")}
                                        keyboardType={'email-address'}
                                        error={(errors.email && touched.email) && errors.email}
                                    />
                                </View>
                                <View style={{ marginTop: pixelSizeHorizontal(10) }}>
                                    <TextInputView
                                        imageSource={ic_password}
                                        onChangeText={handleChange('password')}
                                        // onBlurEffect={handleBlur('mobile')}
                                        value={values.password}
                                        placeholder={Translate.t("password")}
                                        maxLength={10}
                                        keyboardType={'default'}
                                        error={(errors.password && touched.password) && errors.password}
                                    />
                                </View>
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