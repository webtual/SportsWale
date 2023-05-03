
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { black, light_grey, primary, secondary, warmGrey, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
import IconButton from '../../commonComponents/IconButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'

const ChooseIntrest = () => {

    const [selectedList, setSelectedList] = useState([])

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
        if(filter.length){

            let filter = selectedData.filter(x => x.id != item.id)
            selectedData = filter
        }else{
            selectedData.push(item)
        }
        setSelectedList(selectedData)
      
    }

    const checkExists = (item) => {
        let filter = selectedList.filter(x => x.id === item.id)
        if(filter.length){
            return true
        }
        else{
           return false
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { marginHorizontal: pixelSizeHorizontal(20) }]}>

                <ScrollView style={{ flex: 1 }}>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: pixelSizeHorizontal(20) }}>
                        <IconButton
                            additionalStyle={{ marginLeft: pixelSizeHorizontal(-10), }}
                            onPress={() => goBack()}>
                            <Icon name={"arrow-left"} size={24} color={black} />
                        </IconButton>
                        <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_22, color: black }}>Choose intrest  <Text style={{ color: primary }}>{Translate.t("app_name")}</Text></Text>
                    </View>



                    <FlatList style={{marginTop : 20}}
                        data={IntrestData}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            alignSelf: "flex-start",
                            flexWrap: 'wrap'
                        }}
                        // numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => SelectIntrest(item)}
                                style={{
                                    padding: 6,
                                    // width: 100,
                                    backgroundColor: checkExists(item) == true ? primary : secondary,
                                    padding: 10,
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

                    <TouchableOpacity onPress={() => resetScreen("Dashboard")} style={styles.btnLogin}>
                        <Text style={styles.signInText}>DONE</Text>
                    </TouchableOpacity>



                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white
    },

    btnLogin: {
        backgroundColor: primary,
        borderRadius: widthPixel(5),
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixelSizeHorizontal(30)
    },
    signInText: {
        fontSize: FontSize.FS_16,
        color: white,
        fontFamily: MEDIUM,
    }

})

export default ChooseIntrest