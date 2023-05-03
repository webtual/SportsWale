
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { black, black05, disableColor, grey, light_grey, primary, secondary, secondary_dark_grey, secondary_grey, warmGrey, warning, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
import IconButton from '../../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, Input } from 'native-base'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../../constants/ConstantKey'
import CarouselCard from '../../commonComponents/Carousel/index'
import HeaderView from '../../commonComponents/HeaderView'
import { updateLocale } from 'moment'
import { append } from 'domutils'

const Activity = () => {

    const VenuesData = [
        {
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            sportsName:"Cricket",
            activityName:"Indian Premier League",
            Date:"17/11/2023",
            time:"11:00 PM"
        },
        {
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            sportsName:"Cricket",
            activityName:"Indian Premier League",
            Date:"17/11/2023",
            time:"11:00 PM"
        },
        {
            venueName: "Ahemedabad cricket ground",
            venueAddress: "Ahemedabad",
            sportsName:"Cricket",
            activityName:"Indian Premier League",
            Date:"17/11/2023",
            time:"11:00 PM"
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
                                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginTop: 4 }}>{item.Date}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: secondary_grey, }}>Time : </Text>
                                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginTop: 4 }}>{item.time}</Text>
                                </View>
                                    </View>
                             
                                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, paddingHorizontal: 8 }}>{item.activityName}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                    <Icon name={"cricket"} size={20} color={primary} />
                                    <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_15, color: primary, marginTop: 4, padding: 5, backgroundColor: secondary, borderRadius: 8, marginHorizontal: 10 }}>Cricket</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 5, }}>
                                <Icon name={"map-marker-radius-outline"} size={20} color={primary} />
                                <View>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey,marginHorizontal:10}}>{item.venueName}</Text>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey,marginHorizontal:10}}>{item.venueAddress}</Text>
                                </View>
                               
                              </View>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => {navigate("ActivityDetails",{item:item})}}
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
