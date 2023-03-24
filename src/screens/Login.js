
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { black, light_grey, primary, warmGrey, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { navigate } from '../navigations/RootNavigation'

const Login = () => {


    const btnRegisterTap = () => {
        navigate("Register")
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.container,{marginHorizontal : pixelSizeHorizontal(20)}]}>

                <ScrollView style={{flex : 1}}>

            <Text style={styles.headerText}>
                Sign in to <Text style={{color : primary}}>{Translate.t("app_name")}</Text>
            </Text>


            <View style={{marginTop : pixelSizeHorizontal(50)}}>
                <Text style={styles.titleText}>
                    Phone number
                </Text>
                <TextInput 
                    style={{borderRadius : widthPixel(5), borderWidth : 2, borderColor : primary, padding : pixelSizeHorizontal(10), marginTop : pixelSizeHorizontal(10)}}
                    placeholder={"Enter phone number"}
                />
            </View>

            <View style={{marginTop : pixelSizeHorizontal(15)}}>
                <Text style={styles.titleText}>
                    Password
                </Text>
                <TextInput 
                    style={{borderRadius : widthPixel(5), borderWidth : 2, borderColor : primary, padding : pixelSizeHorizontal(10), marginTop : pixelSizeHorizontal(10)}}
                    placeholder={"Enter Password"}
                />
            </View>

            <TouchableOpacity style={{alignSelf : 'flex-end', marginTop : pixelSizeHorizontal(10)}}>
                <Text style={[styles.textForgotPassword]}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text style={styles.descText}>
                By creating an account,i accept the <Text style={{color : primary, fontFamily : SEMIBOLD}}> Terms & Conditions</Text>
            </Text>


            <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf : 'center', marginTop : pixelSizeHorizontal(10)}}
                onPress={() => btnRegisterTap()}>
                <Text style={[styles.textForgotPassword]}>Doesn't have an account? Register</Text>
            </TouchableOpacity>

            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 

    container : {
        flex : 1, backgroundColor: white
    },
    headerText : {
        fontSize : FontSize.FS_22,
        color : black,
        fontFamily : SEMIBOLD,
        marginTop : pixelSizeHorizontal(30)
    },
    titleText : {
        fontSize : FontSize.FS_16,
        color : black,
        fontFamily : REGULAR,
    },
    textForgotPassword : {
        fontSize : FontSize.FS_14,
        color : primary,
        fontFamily : MEDIUM,
    },
    descText : {
        marginTop : pixelSizeHorizontal(30),
            fontSize : FontSize.FS_16,
            color : warmGrey,
            fontFamily : REGULAR,
       
    },
    btnLogin : {
        backgroundColor : primary,
        borderRadius : widthPixel(5),
        padding : pixelSizeHorizontal(10),
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : pixelSizeHorizontal(30)
    },
    signInText : {
        fontSize : FontSize.FS_16,
        color : white,
        fontFamily : MEDIUM,
    }

})

export default Login