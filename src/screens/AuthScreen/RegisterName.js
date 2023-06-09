
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
import { setProfileData } from '../../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'


const RegisterName = ({route}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
        }, [])
    );

    const NameSchema = Yup.object().shape({
        firstname: Yup.string()
            .required("* Please enter your first name"),
            lastname: Yup.string()
            .required("* Please enter your last name"),
    });

    const loginData = (value) => {
        setFirstName(value.firstname)
        setLastName(value.lastname)
        dispatch(setProfileData(value))
        navigate('RegisterUserDetails')
    }
   
    return (
        <>
            <HeaderView title={Translate.t("enter_name")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20),}}>
            <View style={{marginTop:20}}>
            <Formik
                    enableReinitialize
                    initialValues={{
                        firstname : firstName,
                        lastname:lastName
                    }}
                    // initialValues={{
                    //     name: name,
                    // }}
                    validationSchema={NameSchema}
                    onSubmit={values => { loginData(values) }
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginTop: pixelSizeHorizontal(30) }}>

                            <TextInputView
                                imageSource={ic_user}
                                onChangeText={handleChange('firstname')}
                                // onBlurEffect={handleBlur('name')}
                                value={values.firstname}
                                placeholder={Translate.t("fname")}
                                error={(errors.firstname && touched.firstname) && errors.firstname}
                            />
                            <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                            <TextInputView
                                imageSource={ic_user}
                                onChangeText={handleChange('lastname')}
                                // onBlurEffect={handleBlur('name')}
                                value={values.lastname}
                                placeholder={Translate.t("lname")}
                                error={(errors.lastname && touched.lastname) && errors.lastname}
                            />
                            </View>
                             
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


