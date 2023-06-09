
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { black, black05, disableColor, grey, light_grey, primary, primary_light, secondary, secondary_dark_grey, warmGrey, warning, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
import IconButton from '../../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, Input } from 'native-base'
// import { HomeBanner1, HomeBanner2, HomeBanner3 } from '../constants/Images'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../../constants/ConstantKey'
import CarouselCard from '../../commonComponents/Carousel/index'
import HeaderView from '../../commonComponents/HeaderView'
import moment, { updateLocale } from 'moment'
import { append } from 'domutils'
import { ic_calender, ic_clock } from '../../constants/Images'


const Home = () => {

    const [Sport, setSport] = useState("")


    const HomeBanner = [
        {
            image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg"
        },
        {
            image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg"
        },
        {
            image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg"
        },
    ]
    const PickSport = [
        {
            id: 1,
            SportName: 'Cricket',
            SportImage: 'cricket'
        },
        {
            id: 2,
            SportName: 'Football',
            SportImage: 'soccer'
        },
        {
            id: 3,
            SportName: 'Cycling',
            SportImage: 'bike'
        },
        {
            id: 4,
            SportName: 'Baseball',
            SportImage: 'baseball'
        },
        {
            id: 5,
            SportName: 'Swimming',
            SportImage: 'swim'
        },
        {
            id: 6,
            SportName: 'Tennis',
            SportImage: 'tennis'
        },
        {
            id: 7,
            SportName: 'Volley ball',
            SportImage: 'volleyball'
        },

        {
            id: 8,
            SportName: 'Basketball',
            SportImage: 'basketball'
        },
        {
            id: 9,
            SportName: 'Water polo',
            SportImage: 'water-polo'
        },

    ]

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

    const SelectIntrest = (item) => {
        setSport(item)
    }

    const checkExists = (item) => {
        if (Sport.id === item.id) {
            return true
        }
        else {
            return false
        }
    }


    return (

        <HeaderView HeaderSmall={true} StackScreen={true}
            title="Welcome to Sport Wale" isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
            titleColor={white}
            rightComponent={(<View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={"map-marker-radius-outline"} size={26} color={white} />
                <View style={{ justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_12, color: light_grey, alignSelf: "center" }}>Gujarat</Text>

                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_12, color: white, alignSelf: "center" }}>Ahemedabad</Text>
                </View>

            </View>)}
        >
            {/* <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
                <CarouselCard
                    height={180}
                    interval={4000}
                    data={HomeBanner}
                    onPress={item => { }}
                    contentRender={item => <View style={{ borderRadius: widthPixel(10), }}>
                        <Image
                            style={{ borderRadius: widthPixel(8), width: "100%", height: "100%", borderRadius: widthPixel(10), }}
                            source={{uri :"https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg"}}
                        />
                    </View>}
                />
            </View> */}

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 15, paddingHorizontal: pixelSizeHorizontal(20) }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>{Translate.t("select_sport")}</Text>
                {/* <TouchableOpacity>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>See more</Text>
                </TouchableOpacity> */}
            </View>

            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 20
                }}
                data={PickSport}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (<View style={{ width: widthPixel(15) }}></View>)}
                renderItem={({ item }) => (
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <TouchableOpacity onPress={() => SelectIntrest(item)}
                            style={{
                                backgroundColor: checkExists(item) == true ? primary : primary_light,
                                width: 60,
                                height: 60,
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                                borderRadius: 50,
                            }}>
                            <Icon name={item.SportImage} size={42} color={checkExists(item) == true ? white : primary} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: black, marginVertical: 5 }}>{item.SportName}</Text>
                    </View>
                )}
            />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, marginBottom: 10, paddingHorizontal: pixelSizeHorizontal(20) }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>{Translate.t("upcoming_events")}</Text>
                <TouchableOpacity onPress={() => { navigate("Venue") }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>{Translate.t("see_all")}</Text>
                </TouchableOpacity>
            </View>
            <FlatList contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: pixelSizeHorizontal(20) }}
                horizontal
                data={VenuesData}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (<View style={{ width: widthPixel(20), height: heightPixel(20) }}></View>)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigate("VenueDetail", { item: item })}
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: "white",
                            width: SCREEN_WIDTH / 1.9,
                            minHeight:180,
                            // height: 160,
                            borderRadius: 10,
                            shadowColor: black05,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.17,
                            shadowRadius: 8,
                            elevation: 3,
                            alignSelf: "center"
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
                                {/* <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: -5, marginTop: 3 }}> */}
                                {/* <Icon name={"map-marker-radius-outline"} size={20} color={primary} /> */}
                                {/* <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: secondary_dark_grey, }}>{item.venueAddress}</Text> */}
                                {/* </View> */}
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_10, color: secondary_dark_grey, }}>{item.venueAddress}</Text>

                                {/*  <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: secondary_dark_grey, marginHorizontal: 5 }}>{item.rating}</Text>
                                <Icon name={"star"} size={20} color={warning} /> */}
                            </View>

                        </View>
                        <View style={{
                            marginVertical: pixelSizeHorizontal(5),
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",

                        }}>
                            <View style={{ marginHorizontal: 8, flex: 1, flexDirection: "row", alignItems: "center" }}>
                                <FastImage
                                    style={{ width: 15, height: 15 }}
                                    source={ic_calender}
                                />
                                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_11, color: secondary_dark_grey, marginLeft: 5 }}>{moment(new Date()).format("ddd, DD MMM YYYY ")}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                            <FastImage
                                    style={{ width: 15, height: 15 }}
                                    source={ic_clock}
                                />
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_10, color: secondary_dark_grey,marginLeft: 5 }}>{moment(new Date()).format("hh:mm A")}</Text>
                            </View>
                        </View>


                    </TouchableOpacity>
                )}
            />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: pixelSizeHorizontal(20) }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>{Translate.t("recommended_venue")}</Text>
                <TouchableOpacity onPress={() => { navigate("Venue") }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>{Translate.t("see_all")}</Text>
                </TouchableOpacity>
            </View>
            <FlatList contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: pixelSizeHorizontal(20) }}
                horizontal
                data={VenuesData}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (<View style={{ width: widthPixel(20), height: heightPixel(20) }}></View>)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigate("VenueDetail", { item: item })}
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: "white",
                            width: SCREEN_WIDTH / 1.9,
                            borderRadius: 10,
                            minHeight:150,
                            shadowColor: black05,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.17,
                            shadowRadius: 8,
                            elevation: 3,
                            alignSelf: "center",
                        }}>

                        <FastImage
                            style={{ width: "100%", height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            source={{ uri: item.image }}
                            resizeMode="cover"
                        />
                        <View style={{
                            marginVertical: pixelSizeHorizontal(10),
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

        </HeaderView>

    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent: "center"
    },

})

export default Home





//  Task Update(05 - 04 - 2023) :

// (SPORTSWALE) :
// 1.  Add venue screen design 
// 2.  Activity screen design
// 3.  Create activity screen design
// 4.  Add location model