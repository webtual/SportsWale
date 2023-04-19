
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { black, black05, disableColor, grey, light_grey, primary, secondary, secondary_dark_grey, secondary_grey, warmGrey, warning, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, Input } from 'native-base'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../constants/ConstantKey'
import CarouselCard from '../commonComponents/Carousel/index'
import HeaderView from '../commonComponents/HeaderView'
import { updateLocale } from 'moment'
import { append } from 'domutils'
import StarRating from 'react-native-star-rating';
import PopUp from './Popup'

const Request = () => {


const [isModalVisible, setModalVisible] = useState(false)
const [popUpType, setpopUpType] = useState("")

    const VenuesData = [
        {
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            sportsName: "Cricket",
            activityName: "Indian Premier League",
            Date: "17/11/2023",
            time: "11:00 PM"
        },
        {
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            sportsName: "Cricket",
            activityName: "Indian Premier League",
            Date: "17/11/2023",
            time: "11:00 PM"
        },
        {
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            sportsName: "Cricket",
            activityName: "Indian Premier League",
            Date: "17/11/2023",
            time: "11:00 PM"
        },


    ]


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <HeaderView title="Request" isBack={true} onPress={() => goBack()} containerStyle={{ flex: 1, }}
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

                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_18, color: black, paddingHorizontal: 8 }}>{"Event Name"}</Text>
                                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, paddingHorizontal: 8 }}>{item.activityName}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Icon name={"cricket"} size={20} color={black} />
                                    <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_15, color: primary, marginTop: 4, padding: 5, backgroundColor: secondary, borderRadius: 8, marginHorizontal: 10 }}>Cricket</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Icon name={"account-circle-outline"} size={35} color={black} />
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey, }}>{"Mike Smith"}</Text>
                                        <StarRating
                                            fullStarColor={warning}
                                            disabled={false}
                                            maxStars={5}
                                            rating={4}
                                            starSize={16}
                                            containerStyle={{ width: 80 }}
                                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                    </View>
                                </View>
                                <View 
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center",
                                    justifyContent:"space-between",
                                    margin:10,
                                    }}>
                                    <TouchableOpacity  onPress={() => {  
                                        setpopUpType("decline")
                                        toggleModal()
                                    }}
                                    style={{backgroundColor:warmGrey,borderRadius:6,paddingVertical:5,paddingHorizontal:40}}>
                                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: white, }}>DECLINE</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity   onPress={() => {  
                                         setpopUpType("sucess")
                                         toggleModal()
                                        }}
                                    style={{backgroundColor:primary,borderRadius:6,paddingVertical:5,paddingHorizontal:40}}>
                                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: white, }}>ACCEPT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </>
                    )}
                />


            </HeaderView>
            <PopUp popType={popUpType} 
                isVisible={isModalVisible} toggleModel={() => {
                    toggleModal()
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

export default Request
