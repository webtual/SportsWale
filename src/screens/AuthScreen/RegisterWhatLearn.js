


import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, primary_light, secondary, warmGrey, white } from '../../constants/Color'

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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const RegisterWhatLearn = ({ route}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedList, setSelectedList] = useState(route.params.SportData)

    useFocusEffect(
        useCallback(() => {
        }, [])
    );

    const OnPressNext = () => {
        navigate('RegisterWhatYouGain')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
            title={Translate.t("participate")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_20, color: black, margin: 5 }}>{Translate.t("what_you_learn")}</Text>

                    <FlatList
                        data={selectedList}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // justifyContent:"center",
                        }}
                        renderItem={({ item }) => (
                            <View style={{
                                alignItems: "center", marginVertical: 14,
                                justifyContent: "center",
                            }}>
                                <TouchableOpacity 
                                // onPress={() => SelectIntrest(item)}
                                    style={{
                                        backgroundColor:  primary ,
                                        marginHorizontal: 10,
                                        width: 60,
                                        height: 60,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderRadius: 50,
                                    }}>
                                    <Icon name={item.SportImage} size={42} color={white} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: black, marginVertical: 5 }}>{item.SportName}</Text>
                            </View>
                        )}
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

export default RegisterWhatLearn


