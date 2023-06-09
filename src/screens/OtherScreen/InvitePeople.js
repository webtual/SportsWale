
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, primary_light, secondary, warmGrey, white, grey, transparent, light_grey_02 } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
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

const InvitePeople = ({ }) => {

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
        resetScreen('SelectVenue')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
                title={Translate.t("invite_people")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10


                    }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>{"Ms. Shreya .R. Sharma"}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: secondary,
                            paddingHorizontal: 16,
                            paddingVertical: 3,
                            borderRadius: 4
                        }}>
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: white, marginHorizontal: 5 }}>{Translate.t("invite")}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10

                    }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>{"Ms. Shreya .R. Sharma"}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: light_grey_02,
                            paddingHorizontal: 16,
                            paddingVertical: 3,
                            borderRadius: 4
                        }}>
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: white, marginHorizontal: 5 }}>{Translate.t("invite")}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10


                    }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>{"Ms. Shreya .R. Sharma"}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: secondary,
                            paddingHorizontal: 16,
                            paddingVertical: 3,
                            borderRadius: 4
                        }}>
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: white, marginHorizontal: 5 }}>{Translate.t("invite")}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10


                    }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>{"Ms. Shreya .R. Sharma"}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: light_grey_02,
                            paddingHorizontal: 16,
                            paddingVertical: 3,
                            borderRadius: 4
                        }}>
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: white, marginHorizontal: 5 }}>{Translate.t("invite")}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10


                    }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>{"Ms. Shreya .R. Sharma"}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: light_grey_02,
                            paddingHorizontal: 16,
                            paddingVertical: 3,
                            borderRadius: 4
                        }}>
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: white, marginHorizontal: 5 }}>{Translate.t("invite")}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10


                    }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, marginHorizontal: 5 }}>{"Ms. Shreya .R. Sharma"}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: secondary,
                            paddingHorizontal: 16,
                            paddingVertical: 3,
                            borderRadius: 4
                        }}>
                            <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: white, marginHorizontal: 5 }}>{Translate.t("invite")}</Text>

                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => { OnPressNext() }}
                        style={CommonStyle.mainBtnStyle}>
                        <Text style={CommonStyle.mainBtnText}>{Translate.t("continue")}</Text>

                    </TouchableOpacity>
                </View>

            </HeaderView>
            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({


})

export default InvitePeople
