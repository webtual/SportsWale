
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { black, disableColor, grey, light_grey, primary, secondary, secondary_dark_grey, warmGrey, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, Input } from 'native-base'
import { HomeBanner1, HomeBanner2, HomeBanner3 } from '../constants/Images'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../constants/ConstantKey'
import CarouselCard from '../commonComponents/Carousel/index'
import HeaderView from '../commonComponents/HeaderView'


const Home = () => {


    const btnLoginTap = () => {
        goBack()
    }

    const HomeBanner = [
        {
            image: HomeBanner1
        },
        {
            image: HomeBanner2
        },
        {
            image: HomeBanner3
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

    return (

        <HeaderView title="Welcome to Sport Wale" isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
            titleColor={white}
            rightComponent={(<View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={"map-marker-radius-outline"} size={26} color={light_grey} />
                <View style={{ justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_12, color: light_grey, alignSelf: "center" }}>Gujarat</Text>

                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_12, color: white, alignSelf: "center" }}>Ahemedabad</Text>
                </View>

            </View>)}
        >
            <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
                <CarouselCard
                    height={180}
                    interval={4000}
                    data={HomeBanner}
                    onPress={item => { }}
                    contentRender={item => <View style={{ borderRadius: widthPixel(10), }}>
                        <Image
                            style={{ borderRadius: widthPixel(8), width: "100%", height: "100%", borderRadius: widthPixel(10), }}
                            source={item.image}
                        />
                    </View>}
                />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10, paddingHorizontal: pixelSizeHorizontal(20) }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>Pick a sport</Text>
                <TouchableOpacity>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>See more</Text>
                </TouchableOpacity>
            </View>

            <FlatList style={{ marginHorizontal: pixelSizeHorizontal(20) }}
                data={PickSport}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (<View style={{ width: widthPixel(10) }}></View>)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }} onPress={() => console.log(item)}>
                        <View
                            style={{
                                padding: 10,
                                width: 55,
                                backgroundColor: secondary,
                                padding: 10,
                                margin: 5,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 6,
                            }}>
                            <Icon name={item.SportImage} size={24} color={primary} />

                        </View>
                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_12, color: black, flex: 1, }}>{item.SportName}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, marginBottom: 10, paddingHorizontal: pixelSizeHorizontal(20) }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>Recommended venues</Text>
                <TouchableOpacity>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black }}>See all</Text>
                </TouchableOpacity>
            </View>
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