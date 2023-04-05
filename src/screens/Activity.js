
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { black, black05, disableColor, grey, light_grey, primary, secondary, secondary_dark_grey, secondary_grey, warmGrey, warning, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, Input } from 'native-base'
import { HomeBanner1, HomeBanner2, HomeBanner3 } from '../constants/Images'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../constants/ConstantKey'
import CarouselCard from '../commonComponents/Carousel/index'
import HeaderView from '../commonComponents/HeaderView'
import { updateLocale } from 'moment'
import { append } from 'domutils'

const Activity = () => {

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

    return (
        <>
            <HeaderView title="Activity" isBack={false} containerStyle={{ flex: 1, }}
                titleColor={white}

            >
                <FlatList contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: pixelSizeHorizontal(20) }}
                    data={VenuesData}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => (<View style={{ height: heightPixel(20) }}></View>)}
                    ListFooterComponent={() => (<View style={{ height: heightPixel(80) }}></View>)}
                    ItemSeparatorComponent={() => (<View style={{ width: widthPixel(10), height: heightPixel(20) }}></View>)}
                    renderItem={({ item }) => (
                        <>
                            <View 
                                activeOpacity={0.7}
                                style={{
                                    backgroundColor: white,
                                    width: "100%",
                                    borderRadius: 8,
                                    shadowColor: black05,
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.17,
                                    shadowRadius: 8,
                                    elevation: 3
                                }}>
                                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: secondary_grey, }}>Date : </Text>
                                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginTop: 4 }}>17/11/2023</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: secondary_grey, }}>Time : </Text>
                                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginTop: 4 }}>11:00 AM</Text>
                                </View>
                                    </View>
                             
                                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, paddingHorizontal: 8 }}>Indian Premier League</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Icon name={"cricket"} size={20} color={primary} />
                                    <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_15, color: primary, marginTop: 4, padding: 5, backgroundColor: secondary, borderRadius: 8, marginHorizontal: 10 }}>Cricket</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                <Icon name={"map-marker-radius-outline"} size={20} color={primary} />
                                <View>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey,marginHorizontal:10}}>Ahemedabad cricket ground</Text>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey,marginHorizontal:10}}>Thaltej</Text>
                                </View>
                               
                              </View>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => {}}
                                 style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: black,
                                    padding: 5,
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    marginTop: 5
                                }}>
                                    <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_16, color: white, }}>Join now</Text>
                                </TouchableOpacity>
                            </View>

                        </>
                    )}
                />


            </HeaderView>


            <TouchableOpacity onPress={() => navigate("CreateActivity")}
                style={{
                    position: 'absolute', bottom: 20, right: 20,
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: primary, width: 60, height: 60, borderRadius: 75
                }}>
                <Icon name={'plus'} size={35} color={white} />
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent: "center"
    },

})

export default Activity
