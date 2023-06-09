
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

const EventType = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [Txt, setTxt] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [isInvite, setIsInvite] = useState(false);
    const [isFreeAll, setIsFreeAll] = useState(false);

    useFocusEffect(
        useCallback(() => {
        }, [])
    );
    const invite = (isFree) => {
        if (isFree) {
            setIsInvite(true)
            setIsFreeAll(false)
        }
        else {
            setIsFreeAll(true)
            setIsInvite(false)
        }
    }
    const OnPressNext = () => {
        navigate('SelectVenue')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
                title={Translate.t("event_type")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => invite(true)}
                            style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                            <Icon name={isInvite ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={primary} />
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>Invite only</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => invite()}
                            style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, marginHorizontal: 20 }}>
                            <Icon name={isFreeAll ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={primary} />
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>Free for all</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, margin: 5 }}>{Translate.t("paid_event")}</Text>
                    <View style={{ marginHorizontal: pixelSizeHorizontal(5),marginVertical: pixelSizeHorizontal(10) }}>

                        <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
                            <Stack direction={{
                                base: "row",
                                md: "row"
                            }} alignItems={{
                                base: "flex-start",
                                md: "center"
                            }} space={5} >
                                <Radio value="1" colorScheme="blue" size="sm" my={1}>
                                    Yes
                                </Radio>
                                <Radio value="2" colorScheme="blue" size="sm" my={1}>
                                    No
                                </Radio>

                            </Stack>
                        </Radio.Group>

                    </View>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, margin: 5 }}>{Translate.t("enter_amount")}</Text>
                    <View style={{ marginTop: 10 }}>
                        <TextInputView
                            editable={true}
                            imageSource={ic_coin}
                            onChangeText={(text) => { setTxt(text) }}
                            // onBlurEffect={handleBlur('location')}
                            value={Txt}
                            placeholder={Translate.t("enter_amount")}
                            keyboardType={'default'}
                        // error={(errors.location && touched.location) && errors.location}
                        />
                    </View>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, marginHorizontal: 5 }}>{Translate.t("looking_venue")}</Text>
                    <View style={{ marginHorizontal: pixelSizeHorizontal(5),marginVertical: pixelSizeHorizontal(10) }}>

                        <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
                            <Stack direction={{
                                base: "row",
                                md: "row"
                            }} alignItems={{
                                base: "flex-start",
                                md: "center"
                            }} space={5} >
                                <Radio value="1" colorScheme="blue" size="sm" my={1}>
                                    Yes
                                </Radio>
                                <Radio value="2" colorScheme="blue" size="sm" my={1}>
                                    No
                                </Radio>

                            </Stack>
                        </Radio.Group>

                    </View>
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

export default EventType
