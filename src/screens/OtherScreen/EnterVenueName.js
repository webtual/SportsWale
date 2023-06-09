
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, primary_light, secondary, warmGrey, white, grey, transparent } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_activity, ic_coin, ic_location, ic_mobile, ic_user } from '../../constants/Images'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Log } from '../../commonComponents/Log'
import { useFocusEffect } from '@react-navigation/native'
import CommonStyle from '../../commonComponents/CommonStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HStack, Radio, Stack } from 'native-base'

const EnterVenueName = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [Txt, setTxt] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [isInvite, setIsInvite] = useState(false);
    const [isFreeAll, setIsFreeAll] = useState(false);

    useFocusEffect(
        useCallback(() => {
        }, [])
    );

    const OnPressNext = () => {
        navigate('SelectDateTime')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
                title={Translate.t("enter_venue_name")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                <TextInputView
								editable={true}
								imageSource={ic_activity}
								onChangeText={(text)=>{setTxt(text)}}
								// onBlurEffect={handleBlur('location')}
								value={Txt}
								placeholder={Translate.t("enter_venue_name")}
								keyboardType={'default'}
								// error={(errors.location && touched.location) && errors.location}
							/>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => { OnPressNext() }}
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

export default EnterVenueName
