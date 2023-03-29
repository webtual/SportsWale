
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Linking } from 'react-native'
import React, { useState } from 'react'
import { black, black05, grey, light_grey, primary, secondary, secondary_dark_grey, warmGrey, warning, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderView from '../commonComponents/HeaderView'
import { HomeBanner1 } from '../constants/Images'
import { Input } from 'native-base'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../constants/ConstantKey'
import StarRating from 'react-native-star-rating';


const VenueDetail = ({ route }) => {
    const [venueData, setVenueData] = useState(route?.params?.item);
    console.log("route: " + JSON.stringify(route.params.item))


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
    const AmenitiesData = [
        {
            id: 1,
            name: 'Flood lights',
        },
        {
            id: 2,
            name: 'Cafe',
        },
        {
            id: 3,
            name: 'Washroom',
        },
        {
            id: 4,
            name: 'Parking',
        },
        {
            id: 5,
            name: 'Drinking water',
        },
        {
            id: 6,
            name: 'Grass pitch',
        },
        {
            id: 7,
            name: 'Indoor/Outdoor',
        },
        {
            id: 8,
            name: 'Capacity-50',
        },
    ]
    return (
        <>
            <HeaderView title={venueData.venueName} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
                titleColor={white} rightComponent={(<View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => {}}>
                        <Icon name={"heart-outline"} size={26} color={light_grey} style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name={"share-variant-outline"} size={26} color={light_grey} />
                    </TouchableOpacity>


                </View>)}
            >
                <FlatList
                    data={VenuesData}
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{ width: SCREEN_WIDTH, height: widthPixel(220), }}>
                            <FastImage
                                style={{ flex: 1, }}
                                source={{ uri: item.image }}
                            />
                        </View>
                    )}
                />
                <View style={{ marginHorizontal: pixelSizeHorizontal(20), marginVertical: 10, borderBottomWidth: 2, paddingBottom: pixelSizeHorizontal(10),borderBottomColor:secondary }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black }}>{venueData.venueName}</Text>
                </View>
                <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <StarRating
                            fullStarColor={warning}
                            disabled={false}
                            maxStars={5}
                            rating={4}
                            starSize={16}
                            containerStyle={{ width: 80 }}
                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginLeft: 5 }}>4.0</Text>
                    </View>
                    {/* <Text style={{
                        backgroundColor: primary,
                        borderRadius: 6,
                        color: white,
                        fontFamily: REGULAR,
                        fontSize: FontSize.FS_14,
                        padding: 4
                    }}>14km</Text> */}
                </View>
                <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center", marginVertical: pixelSizeHorizontal(5) }}>
                    <Icon name={"map-marker-radius-outline"} size={22} color={primary} />
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_15, color: secondary_dark_grey, }}>Kankaria Football Ground (Maninagar)</Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL("https://www.google.com/maps/place/Ahmedabad,+Gujarat/@23.0204978,72.4396539,11z/data=!3m1!4b1!4m6!3m5!1s0x395e848aba5bd449:0x4fcedd11614f6516!8m2!3d23.022505!4d72.5713621!16zL20vMDFkODhj")}
                    style={{ paddingVertical: 5, marginVertical: 10, backgroundColor: primary, width: 100, marginHorizontal: pixelSizeHorizontal(20), borderRadius: 6, alignItems: "center" }}>
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: white, }}>Show on map</Text>
                </TouchableOpacity>


                <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center", marginVertical: pixelSizeHorizontal(10) }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>Avialable sports :</Text>
                </View>
                <FlatList style={{ marginHorizontal: pixelSizeHorizontal(14), }}
                    data={PickSport}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        alignSelf: "flex-start",
                        flexWrap: 'wrap'
                    }}
                    renderItem={({ item }) => (
                        <View style={{ padding: 6, }}>
                            <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: black, marginLeft: 5 }}>• {item.SportName}</Text>
                        </View>
                    )}
                />


                <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center", marginVertical: pixelSizeHorizontal(10) }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>Amenities/Facalities</Text>
                </View>
                <FlatList style={{ marginHorizontal: pixelSizeHorizontal(14), }}
                    data={AmenitiesData}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        alignSelf: "flex-start",
                        flexWrap: 'wrap'
                    }}
                    renderItem={({ item }) => (
                        <View style={{ padding: 6, }}>
                            <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: black, marginLeft: 5 }}>• {item.name}</Text>
                        </View>
                    )}
                />


                <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center", marginVertical: pixelSizeHorizontal(10) }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>About the vanues :</Text>
                </View>
                <View style={{marginHorizontal:pixelSizeHorizontal(20)}}>
                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: black, marginBottom:8 }}>A cricket field is a large grass field on which the game of cricket is played.
                 Although generally oval in shape, there is a wide variety within this: some are almost perfect circles, some elongated </Text>
                </View>

                <TouchableOpacity onPress={() => resetScreen("Dashboard")} style={styles.btnLogin}>
                        <Text style={styles.signInText}>BOOK NOW</Text>
                    </TouchableOpacity>

            </HeaderView>

        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent: "center"
    },
    btnLogin: {
        backgroundColor: primary,
        borderRadius: widthPixel(5),
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: pixelSizeHorizontal(20),
        marginHorizontal:pixelSizeHorizontal(20),
    },
    signInText: {
        fontSize: FontSize.FS_16,
        color: white,
        fontFamily: MEDIUM,
    }

})

export default VenueDetail