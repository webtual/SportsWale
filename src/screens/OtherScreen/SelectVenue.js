
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, primary_light, secondary, warmGrey, white, grey, transparent, secondary_dark_grey, black05 } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_activity, ic_calender, ic_clock, ic_coin, ic_location, ic_mobile, ic_user } from '../../constants/Images'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Log } from '../../commonComponents/Log'
import { useFocusEffect } from '@react-navigation/native'
import CommonStyle from '../../commonComponents/CommonStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HStack, Radio, Stack } from 'native-base'
import { SCREEN_WIDTH } from '../../constants/ConstantKey'
import moment from 'moment'

const SelectVenue = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [Txt, setTxt] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [isInvite, setIsInvite] = useState(false);
    const [isFreeAll, setIsFreeAll] = useState(false);

    useFocusEffect(
        useCallback(() => {
        }, [])
    );
    const VenuesData = [
        {
            image: "https://content.jdmagicbox.com/comp/delhi/s4/011pxx11.xx11.151026131555.u2s4/catalogue/t-n-memorial-cricket-academy-nyay-khand-1-indirapuram-delhi-cricket-coaching-classes-g3hscbmrj5.jpg",
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            rating: "5.0"
        },
        {
            image: "https://media.hudle.in/venues/e5438e14-eef5-4ef7-8d40-2893200604b0/photo/91577a635c28585de0603a74f2bd7cf2014f27c4",
            venueName: "Vikramnagar Football Ground",
            venueAddress: "Ranip",
            rating: "5.0"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJF5wMaNyC_atpMCOVJhDT-BuOFLkQ_4qpA&usqp=CAU",
            venueName: "ACC cricket ground",
            venueAddress: "Thaltej",
            rating: "5.0"
        },
        {
            image: "https://media.istockphoto.com/id/1130905980/photo/universal-grass-stadium-illuminated-by-spotlights-and-empty-green-grass-playground.jpg?b=1&s=170667a&w=0&k=20&c=7t-jHN-NyuCMH2S9BwUGmQBjbMZaRCykeG86n1PYaD0=",
            venueName: "Colosseum Ahmedabad",
            venueAddress: "Prahald nagar",
            rating: "5.0"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR355I7R0GFo-MLsVRZ0NPICjpTVSRG1T8gyQ&usqp=CAU",
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ghatlodia",
            rating: "5.0"
        },
        {
            image: "https://i1.wp.com/cricketgraph.com/wp-content/uploads/2017/06/LOGO-2.jpg?fit=613%2C341&ssl=1",
            venueName: "Kankaria Football Ground (Maninagar)",
            venueAddress: "Nikol",
            rating: "5.0"
        },
        {
            image: "https://content.jdmagicbox.com/comp/delhi/s4/011pxx11.xx11.151026131555.u2s4/catalogue/t-n-memorial-cricket-academy-nyay-khand-1-indirapuram-delhi-cricket-coaching-classes-g3hscbmrj5.jpg",
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Naroda",
            rating: "5.0"
        },
        {
            image: "https://cdn3.mycity4kids.com/images/article-images/mobile-web/details/img-20160912-57d683c46cf11.jpg",
            venueName: "Table Tennis Association of Ahmedabad",
            venueAddress: "Bodakdev",
            rating: "5.0"
        },
    ]
    const OnPressNext = () => {
        navigate('SelectSlot')
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
                title={Translate.t("select_venue")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 10 }}>
                                  
                    <FlatList contentContainerStyle={{  paddingBottom:15  }}
                        // horizontal
                        numColumns={2}
                        data={VenuesData}
                        // showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => (<View style={{ width: widthPixel(20), height: heightPixel(20) }}></View>)}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigate("SelectSlot", { item: item })}
                                activeOpacity={0.7}
                                style={{
                                    flex:1,
                                    backgroundColor: "white",
                                    // width: SCREEN_WIDTH / 2.5,
                                    minHeight: 150,
                                    // height: 160,
                                    borderRadius: 10,
                                    shadowColor: black05,
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.17,
                                    shadowRadius: 8,
                                    elevation: 1,
                                    alignSelf: "center",
                                    marginHorizontal:5
                                }}>

                                <FastImage
                                    style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                    source={{ uri: item.image }}
                                    resizeMode="cover"
                                />
                                <View style={{
                                    marginVertical: pixelSizeHorizontal(5),
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                }}>
                                    <View style={{ marginHorizontal: 8, flex: 1 }}>
                                        <Text numberOfLines={2} style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_12, color: black, }}>{item.venueName}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_10, color: secondary_dark_grey, }}>{item.venueAddress}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    {/* <TouchableOpacity activeOpacity={0.7}
                        onPress={() => { OnPressNext() }}
                        style={CommonStyle.mainBtnStyle}>
                        <Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>

                    </TouchableOpacity> */}
                </View>

            </HeaderView>
            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({


})

export default SelectVenue
