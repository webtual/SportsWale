import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { black, primary, secondary, warmGrey, white } from '../constants/Color'
import { pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM, REGULAR } from '../constants/Fonts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet from "react-native-easy-bottomsheet"

const VenueLocationModel = ({ isVisible, title, toggleModel, onAddLocation, ...props }) => {
// console.log("isVisible",toggleModel())
    const [selectedLocation, setSelectedLocation] = useState("")


    useEffect(() => {
        if (props?.selected_sport) {
            setSelectedLocation(props?.selected_sport)
        }

    }, [props?.selected_sport])


    const LocationData = [
        {
            id: 1,
            venueName: 'Ahemedabad cricket Ground',
            venueLocation: 'Ahemedabad',
        },
        {
            id: 2,
            venueName: 'Surat cricket Ground',
            venueLocation: 'Surat',
        },
        {
            id: 3,
            venueName: 'Vadodara cricket Ground',
            venueLocation: 'Vadodara',
        },
        
    ]
    const SelectLocation = (item) => {

        if(props.isSingleSelect){
            setSelectedLocation(item)
            console.log('====================================');
            console.log("sport name", selectedLocation);
            console.log('====================================');
        }
        else{
            var selectedData = [...selectedLocation]

            let filter = selectedData.filter(x => x.id === item.id)
            if (filter.length) {
    
                let filter = selectedData.filter(x => x.id != item.id)
                selectedData = filter
            } else {
                setSelectedLocation.push(item)
            }
            console.log('====================================');
            console.log("selectedData", selectedData);
            console.log('====================================');
            setSelectedLocation(selectedData)
        }
       

    }

    const checkExists = (item) => {
        if(props.isSingleSelect){
            if (selectedLocation.id === item.id) {
                return true
            }
            else {
                return false
            }
        }
        else{
            let filter = selectedLocation.filter(x => x.id === item.id)
            if (filter.length) {
                return true
            }
            else {
                return false
            }
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
            bottomSheetVisible={isVisible}
        >


            <ScrollView>

                <View style={{ backgroundColor: white, margin: 5 }}>
                    <FlatList
                        data={LocationData}
                        contentContainerStyle={{
                            // flexDirection: 'row',
                            // alignSelf: "flex-start",
                            // flexWrap: 'wrap'
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => SelectLocation(item)}
                                style={{
                                    backgroundColor:  secondary,
                                    padding: 6,
                                    margin: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderRadius: 8,
                                    justifyContent:"space-between"
                                }}>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Icon name={"map-marker-outline"} size={24} color={primary} />
                                       <View>
                                       <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color:  black, marginLeft: 5 }}>{item.venueName}</Text>
                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color:  warmGrey, marginLeft: 5 }}>{item.venueLocation}</Text>
                                       </View>
                                    </View>
                                      {checkExists(item) == true ?
                                        <Icon name={"check"} size={24} color={primary} />
                                        :
                                        <></>
                                      } 
                                     
                               
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        onAddLocation(selectedLocation)
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

export default VenueLocationModel