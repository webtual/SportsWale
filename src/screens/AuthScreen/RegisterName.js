
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


const RegisterName = ({}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [txtName, setTxtName] = useState("")


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

    const NameSchema = Yup.object().shape({
        name: Yup.string()
            // .min(10, '* Please enter your name')
            .required("* Please enter your name"),
    });

    const loginData = (value) => {
        Log("NAME :", value)
        setTxtName(value.name)
        navigate('RegisterMobile',{isRegister: true})
        // Api_Check_mobile(true, value)
    }

    const btnRegisterTap = () =>{
        navigate('Register')
    }
    return (
        <>
            <HeaderView title={Translate.t("enter_name")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20),}}>
            <View style={{marginTop:20}}>
            <Formik
                    enableReinitialize
                    initialValues={{
                        name : txtName
                    }}
                    // initialValues={{
                    //     name: name,
                    // }}
                    validationSchema={NameSchema}
                    onSubmit={values => { loginData(values) }
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginTop: pixelSizeHorizontal(60) }}>

                            <TextInputView
                                imageSource={ic_user}
                                onChangeText={handleChange('name')}
                                // onBlurEffect={handleBlur('name')}
                                value={values.name}
                                placeholder={Translate.t("name")}
                                maxLength={10}
                                error={(errors.name && touched.name) && errors.name}
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

  
})

export default RegisterName


