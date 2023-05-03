
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { black, light_grey, primary, warmGrey, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_user } from '../../constants/Images'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const btnRegisterTap = () => {
        navigate("Register")
    }

    return (
        <>
            <HeaderView title={Translate.t("enter_name")} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20),}}>


            <ScrollView>
            <View style={{marginTop:20}}>
                <TextInputView imageSource={ic_user} />
                </View>
                
            </ScrollView>
            {/* <AlertView
                isAlertVisible={AlertShow}
                toggleAlert={() => AlertActive()}
                title={Translate.t('alert')}
                description={alerMessage}
                type="error"
                cancleText="Ok"
                onCancel={() => { setAlertShow(false) }}
            /> */}
            </HeaderView>

            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({

    // container : {
    //     flex : 1, backgroundColor: white
    // },
    headerText: {
        fontSize: FontSize.FS_22,
        color: black,
        fontFamily: SEMIBOLD,
        marginTop: pixelSizeHorizontal(30)
    },
    titleText: {
        fontSize: FontSize.FS_16,
        color: black,
        fontFamily: REGULAR,
    },
    textForgotPassword: {
        fontSize: FontSize.FS_14,
        color: primary,
        fontFamily: MEDIUM,
    },
    descText: {
        marginTop: pixelSizeHorizontal(30),
        fontSize: FontSize.FS_16,
        color: warmGrey,
        fontFamily: REGULAR,

    },
    btnLogin: {
        backgroundColor: primary,
        borderRadius: widthPixel(5),
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixelSizeHorizontal(30)
    },
    signInText: {
        fontSize: FontSize.FS_16,
        color: white,
        fontFamily: MEDIUM,
    }

})

export default Login