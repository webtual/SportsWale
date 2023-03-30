
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
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
import { color } from 'native-base/lib/typescript/theme/styled-system'
import AddModel from '../commonComponents/AddModel'
import BottomSheet from 'react-native-easy-bottomsheet'

const Venue = () => {

    const [isAddModal, setIsAddModal] = useState(false);

    const AddModal = () => {
        setIsAddModal(!isAddModal);
    };

    const btnLoginTap = () => {
        goBack()
    }

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
            <HeaderView title="Venues" isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
                titleColor={white} rightComponent={(
                    <TouchableOpacity onPress={() => navigate('AddVenue')}>
                        <Icon name="plus-circle-outline" size={24} color={white} />
                    </TouchableOpacity>
                )}>
                <View>
                    <View style={{ marginVertical: pixelSizeHorizontal(15), marginHorizontal: pixelSizeHorizontal(20) }} >
                        <Input backgroundColor={grey} size="md" h={"10"} _focus={{ borderColor: primary, borderWidth: 1.5 }}
                            InputLeftElement={<Icon name={"magnify"} style={{ marginHorizontal: 5 }} pr={"2"} size={26} color={secondary_dark_grey} />} placeholder="Search" />
                    </View>
                    <FlatList contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: pixelSizeHorizontal(20) }}
                        data={VenuesData}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => (<View style={{ width: widthPixel(10), height: heightPixel(20) }}></View>)}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigate("VenueDetail", { item: item })}
                                activeOpacity={0.7}
                                style={{
                                    backgroundColor: white,
                                    width: "100%",
                                    // height: 160,
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

                                <FastImage
                                    style={{ width: "100%", height: 120, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                    source={{ uri: item.image }}
                                    resizeMode="cover"
                                />
                                <View style={{
                                    marginHorizontal: pixelSizeHorizontal(16),
                                    marginVertical: pixelSizeHorizontal(5),
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                }}>
                                    <View>
                                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, }}>{item.venueName}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: -5, marginTop: 3 }}>
                                            <Icon name={"map-marker-radius-outline"} size={20} color={primary} />
                                            <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: secondary_dark_grey, }}>{item.venueAddress}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: secondary_dark_grey, marginHorizontal: 5 }}>{item.rating}</Text>
                                        <Icon name={"star"} size={20} color={warning} />
                                    </View>
                                </View>


                            </TouchableOpacity>
                        )}
                    />
                </View>


            </HeaderView>

            <AddModel
                title={"Add venues"}
                isAddVisible={isAddModal}
                toggleModel={() => AddModal()}
                onAddVenue={(data) => {
                    console.log('====================================');
                    console.log("selected data : ", data);
                    console.log('====================================');
                }} />


        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent: "center"
    },

})

export default Venue