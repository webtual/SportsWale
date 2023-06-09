
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, primary_light, secondary, warmGrey, white,grey,transparent } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_activity, ic_location, ic_mobile, ic_user } from '../../constants/Images'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Log } from '../../commonComponents/Log'
import { useFocusEffect } from '@react-navigation/native'
import CommonStyle from '../../commonComponents/CommonStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const EnterActivityName = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [ActivityName, setActivityName] = useState("")
    const [Txt, setTxt] = useState("")
    const [isFocus, setIsFocus] = useState(false)

    useFocusEffect(
        useCallback(() => {
        }, [])
    );

    const OnPressNext = () => {
        navigate('EventType')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
            title={Translate.t("enter_activity_name")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                <TextInputView
								editable={true}
								imageSource={ic_activity}
								onChangeText={(text)=>{setActivityName(text)}}
								// onBlurEffect={handleBlur('location')}
								value={ActivityName}
								placeholder={Translate.t("enter_activity_name")}
								keyboardType={'default'}
								// error={(errors.location && touched.location) && errors.location}
							/>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, margin: 5 }}>{Translate.t("description")}</Text>
                    <TextInput
                        returnKeyType='none'
                        multiline={true}
                        value={Txt}
                        onChangeText={(text) => setTxt(text)}
                        placeholder={Translate.t("description")}    
                        placeholderTextColor={grey}
                        editable={true}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        style={{
                            fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black, height: 120, padding: 10, marginVertical: 10,
                            paddingVertical: pixelSizeHorizontal(10), borderColor: isFocus ? primary : transparent, borderWidth: 1, backgroundColor: white, borderRadius: 10
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

export default EnterActivityName
