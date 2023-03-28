
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

const VenueDetail = ({ route }) => {
    const [venueData, setVenueData] = useState(route?.params?.item);
    console.log("route: " + JSON.stringify(route.params.item))



    return (
        <>
            <HeaderView title={venueData.venueName} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
                titleColor={white} rightComponent={(<View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => LikeButton(true)}>
                        <Icon name={"heart-outline"} size={26} color={light_grey} style={{ marginHorizontal: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name={"share-variant-outline"} size={26} color={light_grey} />
                    </TouchableOpacity>


                </View>)}
            >
                <View>
                    <FastImage
                        style={{ width: "100%", height: 200, }}
                        source={{ uri: venueData.image }}
                        resizeMode="cover"
                    />
                    <View style={{ marginHorizontal: pixelSizeHorizontal(20), marginVertical: 8 }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black }}>{venueData.venueName}</Text>
                    </View>
                    <View style={{ backgroundColor: warmGrey, height: 2, width: "100%" }}></View>

                </View>
            </HeaderView>

        </>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent: "center"
    },

})

export default VenueDetail