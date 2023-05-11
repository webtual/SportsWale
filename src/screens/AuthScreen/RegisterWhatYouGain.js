
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, grey, light_grey, primary, secondary, transparent, warmGrey, white } from '../../constants/Color'

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


const RegisterWhatYouGain = ({}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [Txt, setTxt] = useState("")


    useFocusEffect(
        useCallback(() => {
        }, [])
    );

  

   

    const OnPressNext = () =>{
        navigate('RegisterFinal')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
             title={Translate.t("participate")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20),}}>
            <View style={{marginTop:20}}>
            <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_20, color: black, margin: 5 }}>{Translate.t("i_hope_to_gain")}</Text>
            <TextInput
            returnKeyType='none'
            multiline={true}
                value={Txt}
                onChangeText={(text) =>setTxt(text)}
                placeholder={"Write Something Here...."}
                placeholderTextColor={grey}
                editable={true}
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
                style={{
                     fontFamily: MEDIUM, fontSize: FontSize.FS_16, color:  black,height:120,padding:10,marginVertical:10,
                    paddingVertical: pixelSizeHorizontal(10),borderColor:isFocus? primary:transparent,borderWidth:1,backgroundColor:white,borderRadius:10
                }}
            />
            <TouchableOpacity activeOpacity={0.7}
								onPress={() =>{OnPressNext()}}
								style={CommonStyle.mainBtnStyle}>
								<Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>

							</TouchableOpacity>
                </View>
            </HeaderView>
            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({

  
})

export default RegisterWhatYouGain


