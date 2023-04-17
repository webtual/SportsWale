
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { black, black05, light_grey, primary, secondary_dark_grey, secondary_grey, white, secondary, warmGrey } from '../constants/Color'

import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, resetScreen } from '../navigations/RootNavigation'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderView from '../commonComponents/HeaderView'


const ActivityDetails = ({ route }) => {
    console.log("route", route?.prams?.item)

    const [activityData, setActivityData] = useState()



    return (
        <>
            <HeaderView title={route?.params?.item?.activityName} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
                titleColor={white} rightComponent={(<TouchableOpacity>
                    <Icon name={"share-variant-outline"} size={26} color={light_grey} />
                </TouchableOpacity>)} >

                <View style={{ margin: 20, }}>
                    <View
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: white,
                            width: "100%",
                        }}>


                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>Indian Premier League</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, }}>
                            <Icon name={"cricket"} size={20} color={primary} />
                            <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_15, color: primary, marginTop: 4, padding: 5, backgroundColor: secondary, borderRadius: 8, marginHorizontal: 10 }}>Cricket</Text>
                        </View>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: warmGrey, marginTop: 5 }}>Address</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, }}>
                            <Icon name={"map-marker-radius-outline"} size={20} color={primary} />
                            <View>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey, marginHorizontal: 10 }}>Ahemedabad cricket ground</Text>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey, marginHorizontal: 10 }}>Thaltej</Text>
                            </View>

                        </View>
                        <View style={{ marginVertical: 5, }}>
                            <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: warmGrey, }}>Date : </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, }}>
                                <Icon name={"calendar-range"} size={20} color={primary} />
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginHorizontal: 10 }}>12/11/2023</Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: warmGrey, }}>Time : </Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, }}>
                                    <Icon name={"clock-time-five-outline"} size={20} color={primary} />
                                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginHorizontal: 10 }}>10:45 PM</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical: 5, }}>
                            <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: warmGrey, }}>Joining type</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, }}>
                                <Icon name={"currency-usd"} size={20} color={primary} />
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginHorizontal: 10 }}>Free</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </HeaderView>
            <TouchableOpacity onPress={() => resetScreen("Dashboard")} style={styles.btnLogin}>
                <Text style={styles.signInText}>JOIN</Text>
            </TouchableOpacity>

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
        marginHorizontal: pixelSizeHorizontal(20),
    },
    signInText: {
        fontSize: FontSize.FS_16,
        color: white,
        fontFamily: MEDIUM,
    }

})

export default ActivityDetails