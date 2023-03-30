import { View, Text, Share, StyleSheet, Pressable, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { black, black03, greenPrimary, offWhite, paleGreen, primary, secondary, white } from '../constants/Color'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../commonComponents/ResponsiveScreen'
import Translate from '../translation/Translate'
import FastImage from 'react-native-fast-image'
import { CoinImg, CongratsImg, ShareBoxImg, WithdrawImg } from '../constants/Images'
import { ANDROID_APP_LINK, IOS_APP_LINK } from '../constants/ConstantKey'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconButton from './IconButton'
import BottomSheet from "react-native-easy-bottomsheet";

const AddModel = ({ isAddVisible, title, toggleModel, onAddVenue, ...props }) => {

    const [selectedList, setSelectedList] = useState([])


    useEffect(() => {
        if (props?.selected_sport) {
            setSelectedList(props?.selected_sport)
        }

    }, [props?.selected_sport])

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
        var selectedData = [...selectedList]

        let filter = selectedData.filter(x => x.id === item.id)
        if (filter.length) {

            let filter = selectedData.filter(x => x.id != item.id)
            selectedData = filter
        } else {
            selectedData.push(item)
        }
        console.log('====================================');
        console.log("selectedData", selectedData);
        console.log('====================================');
        setSelectedList(selectedData)

    }

    const checkExists = (item) => {
        let filter = selectedList.filter(x => x.id === item.id)
        if (filter.length) {
            return true
        }
        else {
            return false
        }

    }


    return (
        <BottomSheet
            // onBackdropPress={true}
            bottomSheetTitle={title}
            bottomSheetIconColor="#0A2463"
            bottomSheetStyle={{
                backgroundColor: "white",
                maxHeight: "80%",
                minHeight: "15%",
            }}
            bottomSheetTitleStyle={{ color: '#0A2463' }}
            onRequestClose={() => toggleModel()}
            bottomSheetVisible={isAddVisible}
        >


            <ScrollView>

                <View style={{ backgroundColor: white, margin: 5 }}>
                    <View style={{ margin: pixelSizeHorizontal(10) }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>Avialable sports :</Text>
                    </View>
                    <FlatList
                        data={IntrestData}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            alignSelf: "flex-start",
                            flexWrap: 'wrap'
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => SelectIntrest(item)}
                                style={{
                                    backgroundColor: checkExists(item) == true ? primary : secondary,
                                    padding: 6,
                                    margin: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderRadius: 8,
                                }}>
                                <Icon name={item.SportImage} size={24} color={checkExists(item) == true ? white : black} />

                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: checkExists(item) == true ? white : black, marginLeft: 5 }}>{item.SportName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    {/* 
                    <View style={{ margin: pixelSizeHorizontal(10) }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>Amenities/Facalities</Text>
                    </View> */}



                </View>
                <TouchableOpacity
                    onPress={() => {
                        onAddVenue(selectedList)
                        toggleModel()
                    }}
                    style={styles.btnLogin}>
                    <Text style={styles.signInText}>ADD</Text>
                </TouchableOpacity>
            </ScrollView>

        </BottomSheet>
    )
}


const styles = StyleSheet.create({

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

export default AddModel