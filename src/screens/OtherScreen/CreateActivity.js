
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import { black, light_grey, primary, primary_light, secondary, warmGrey, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate } from '../../navigations/RootNavigation'
import HeaderView from '../../commonComponents/HeaderView'
import LoadingView from '../../commonComponents/LoadingView'
import FastImage from 'react-native-fast-image'
import TextInputView from '../../commonComponents/TextInputView'
import { ic_mobile, ic_user } from '../../constants/Images'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Log } from '../../commonComponents/Log'
import { useFocusEffect } from '@react-navigation/native'
import CommonStyle from '../../commonComponents/CommonStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CreateActivity = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedList, setSelectedList] = useState([])
    const [Sport, setSport] = useState("")
    useFocusEffect(
        useCallback(() => {
        }, [])
    );


    const IntrestData = [
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
    const OnPressNext = () => {
        navigate('EnterActivityName',{SportData:Sport})
    }
    return (
        <>
            <HeaderView HeaderSmall={true}
            title={Translate.t("create_activity")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_20, color: black, margin: 5 }}>{Translate.t("select_sport")}</Text>

                    <FlatList
                        data={IntrestData}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // justifyContent:"center",
                        }}
                        renderItem={({ item }) => (
                            <View style={{
                                alignItems: "center", marginVertical: 14,
                                justifyContent: "center",
                            }}>
                                <TouchableOpacity onPress={() => SelectIntrest(item)}
                                    style={{
                                        backgroundColor: checkExists(item) == true ? primary : primary_light,
                                        marginHorizontal: 10,
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
                    <TouchableOpacity activeOpacity={0.7}
								onPress={() =>{OnPressNext()}}
								style={CommonStyle.mainBtnStyle}>
								<Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>

							</TouchableOpacity>
                </View>

            </HeaderView>
            {isLoading && <LoadingView />}
        </>
    )
}

const styles = StyleSheet.create({


})

export default CreateActivity



// import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, CheckBox } from 'react-native'
// import React, { useState } from 'react'
// import { black, disableColor, grey, light_grey, primary, secondary, secondary_dark_grey, warmGrey, white } from '../../constants/Color'

// import Translate from '../../translation/Translate'
// import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
// import { heightPixel, pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
// import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
// import IconButton from '../../commonComponents/IconButton'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Checkbox, FlatList, Input, Stack } from 'native-base'
// import FastImage from 'react-native-fast-image'
// import { SCREEN_WIDTH } from '../../constants/ConstantKey'
// import CarouselCard from '../../commonComponents/Carousel/index'
// import HeaderView from '../../commonComponents/HeaderView'
// import { updateLocale } from 'moment'
// import { append } from 'domutils'
// import AddModel from '../../commonComponents/AddModel'
// import VenueLocationModel from '../../commonComponents/VenueLocationModel'

// const CreateActivity = () => {

//     const [sportModal, setSportModal] = useState(false);
//     const [locationModal, setLocationModal] = useState(false);
//     const [selectedSport, setSelectedSport] = useState("");
//     const [selectedLocation, setSelectedLocation] = useState("");
//     const [isFree, setIsFree] = useState(false);
//     const [isPaid, setIsPaid] = useState(false);

//     const [isInvite, setIsInvite] = useState(false);
//     const [isFreeAll, setIsFreeAll] = useState(false);


//     const SelectSportModel = () => {
//         setSportModal(!sportModal);
//     };
//     const SelectLocationModel = () => {
//         setLocationModal(!locationModal);
//     };

//     const joinType = (isFree) => {
//         if (isFree) {
//             setIsFree(true)
//             setIsPaid(false)
//         }
//         else {
//             setIsPaid(true)
//             setIsFree(false)
//         }

//     }
//     const invite = (isFree) => {
//         if (isFree) {
//             setIsInvite(true)
//             setIsFreeAll(false)
//         }
//         else {
//             setIsFreeAll(true)
//             setIsInvite(false)
//         }
//     }

//    const  createActivity = () => {
//     navigate("Activity")
//    }
//     return (

//         <HeaderView title="Create Activity" isBack={true} onPress={() => goBack()} containerStyle={{ flex: 1, paddingHorizontal: pixelSizeHorizontal(20) }}
//             titleColor={white}

//         >
//             <View style={{ marginVertical: pixelSizeHorizontal(20) }}>


//                 <View style={{ alignItems: "center", justifyContent: 'center' }}>
//                     <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_20, color: black, textAlign: "center" }}>Create Activity</Text>
//                     <View style={{ width: 100, height: 2, backgroundColor: primary, marginVertical: 3 }}></View>
//                 </View>
//                 <TouchableOpacity onPress={() => { SelectSportModel() }}
//                     style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Icon name={"trophy-variant-outline"} size={24} color={primary} />
//                             <View style={{ marginLeft: 10 }}>
//                                 <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Sport</Text>
//                                 <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_20, color: black, marginTop: 5 }}>{selectedSport == "" ? "Select Sport" : selectedSport?.SportName}</Text>
//                             </View>
//                         </View>
//                         <Icon name={"arrow-right-thin"} size={24} color={primary} />
//                     </View>

//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => { SelectLocationModel() }}
//                     style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Icon name={"map-marker-outline"} size={24} color={primary} />
//                             <View style={{ marginHorizontal: 10 }}>
//                                 <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Venue / Ground / Area</Text>
//                                 <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_20, color: black, marginTop: 5 }}>{selectedLocation == "" ? "Select Location" : selectedLocation?.venueName}</Text>
//                             </View>
//                         </View>
//                         <Icon name={"arrow-right-thin"} size={24} color={primary} />
//                     </View>

//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Icon name={"calendar-range"} size={24} color={primary} />
//                             <View style={{ marginLeft: 10 }}>
//                                 <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Date</Text>
//                                 <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_20, color: black, marginTop: 5 }}>17/11/2023</Text>
//                             </View>
//                         </View>
//                         <Icon name={"arrow-right-thin"} size={24} color={primary} />
//                     </View>

//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Icon name={"clock-outline"} size={24} color={primary} />
//                             <View style={{ marginLeft: 10 }}>
//                                 <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Time</Text>
//                                 <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_20, color: black, marginTop: 5 }}>11:00 AM</Text>
//                             </View>
//                         </View>
//                         <Icon name={"arrow-right-thin"} size={24} color={primary} />
//                     </View>

//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", }}>
//                         <Icon name={"information-outline"} size={24} color={primary} />

//                         <View style={{ marginLeft: 10 }}>
//                             <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Description</Text>

//                             <TextInput multiline={true}
//                                 style={styles.inputStyle}
//                                 placeholder={"Write description...."}
//                             />
//                         </View>
//                     </View>

//                 </TouchableOpacity>

//                 <View style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", }}>
//                         <Icon name={"currency-usd"} size={24} color={primary} />

//                         <View style={{ marginLeft: 10 }}>
//                             <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Joining type</Text>
//                             <View style={{ flexDirection: "row", alignItems: "center", }}>
//                                 <TouchableOpacity onPress={() => joinType(true)}
//                                     style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
//                                     <Icon name={isFree ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={primary} />
//                                     <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: black, marginHorizontal: 5 }}>Free</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => joinType()}
//                                     style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, marginHorizontal: 20 }}>
//                                     <Icon name={isPaid ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={primary} />
//                                     <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: black, marginHorizontal: 5 }}>Paid</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={{ borderWidth: 1, borderColor: primary, borderRadius: 6, padding: 5, marginTop: 25 }}>
//                     <View style={{ flexDirection: "row", alignItems: "center", }}>
//                         <Icon name={"currency-usd"} size={24} color={primary} />

//                         <View style={{ marginLeft: 10 }}>
//                             <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: warmGrey }}>Type</Text>
//                             <View style={{ flexDirection: "row", alignItems: "center", }}>
//                                 <TouchableOpacity onPress={() => invite(true)}
//                                     style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
//                                     <Icon name={isInvite ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={primary} />
//                                     <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: black, marginHorizontal: 5 }}>Invite only</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => invite()}
//                                     style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, marginHorizontal: 20 }}>
//                                     <Icon name={isFreeAll ? "checkbox-marked" : "checkbox-blank-outline"} size={24} color={primary} />
//                                     <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: black, marginHorizontal: 5 }}>Free for all</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <TouchableOpacity onPress={() => { createActivity() }}
//                     style={styles.primaryBtn}>
//                     <Text style={styles.primaryBtnText}>CREATE</Text>
//                 </TouchableOpacity>
//             </View>
//             <AddModel
//                 isSingleSelect={true}
//                 isFacalities={false}
//                 title={"Available Sport"}
//                 isAddVisible={sportModal}
//                 toggleModel={() => SelectSportModel()}
//                 selected_sport={selectedSport}
//                 onAddVenue={(data) => {
//                     console.log("select sport name : ", data)
//                     setSelectedSport(data)
//                 }} />
//             <VenueLocationModel
//                 isSingleSelect={true}
//                 title={"Select Location"}
//                 isVisible={locationModal}
//                 toggleModel={() => SelectLocationModel()}
//                 selected_sport={selectedLocation}
//                 onAddLocation={(data) => {
//                     console.log("select locaion name : ", data)
//                     setSelectedLocation(data)
//                 }} />
//         </HeaderView>



//     )
// }


// const styles = StyleSheet.create({

//     container: {
//         flex: 1, backgroundColor: white,
//         justifyContent: "center"
//     },
//     inputStyle: {
//         // borderRadius: widthPixel(5),
//         // borderWidth: 1,
//         // borderColor: primary,
//         // paddingHorizontal: pixelSizeHorizontal(10),
//         // marginTop: pixelSizeHorizontal(40),
//         fontSize: 15,
//         paddingVertical: 5,
//         paddingLeft: -3
//     },
//     primaryBtnText: {
//         fontSize: FontSize.FS_15,
//         color: white,
//         fontFamily: MEDIUM,
//     },
//     primaryBtn: {
//         backgroundColor: primary,
//         borderRadius: widthPixel(5),
//         padding: pixelSizeHorizontal(10),
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: pixelSizeHorizontal(20),
//     },

// })

// export default CreateActivity
