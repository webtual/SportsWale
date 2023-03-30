
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Linking, Alert, Animated, Dimensions, Platform, PermissionsAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { black, black05, grey, light_grey, primary, secondary, secondary_dark_grey, warmGrey, warning, white, secondary_grey } from '../constants/Color'

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
import { SCREEN_WIDTH } from '../constants/ConstantKey'
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-crop-picker';

const AddVenue = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [venueImage, setVenueImage] = useState([])
    const [isImageUpdate, setIsImageUpdate] = useState(false)
    const [index, setIndex] = useState(0);

    useEffect(() => {
        onOpneScanner()
    }, [])


    const onOpneScanner = () => {
        // To Start Scanning
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'App needs permission for camera access',
                        },
                    );

                    console.log("Camera Permission : " + granted)

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // If CAMERA Permission is granted

                    } else {
                      alert("CAMERA permission denied")
                    //   requestCameraPermission()
                    }
                } catch {
                    (err) => {
                        console.warn(err);
                    }
                }
            }
            // Calling the camera permission function
            requestCameraPermission();
        } else {
        }
    };

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log("viewableItems",viewableItems)
        setIndex(viewableItems[0]?.index);
    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };
    
    const deleteItem = (item) => {
        var newlist = [...venueImage]
        console.log("newlist", newlist)

        let filterData = newlist.filter(s => s.path !== item.path)
        console.log("filterData", filterData)
        setVenueImage(filterData)
    }
    const UploadImage = () => {
        Alert.alert("Select from", "Upload your ground picture", [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'Gallery',
                onPress: () => {
                    setIsLoading(true)
                    ImagePicker.openPicker({
                        multiple: true,
                        freeStyleCropEnabled: true,
                        cropping: true,
                        mediaType: 'photo',
                        includeBase64: false,
                        compressImageQuality: 0.7
                    }).then(images => {
                        console.log("Selected Image  " + JSON.stringify(images))
                        setVenueImage(images)
                        setIsImageUpdate(true)
                        setIsLoading(false)
                    }).catch((error) => {
                        setIsLoading(false)
                        console.log(error)
                    });
                }
            },
            {
                text: 'Camera',
                onPress: () => {

                    setIsLoading(true)
                    ImagePicker.openCamera({
                        width: SCREEN_WIDTH,
                        height: SCREEN_WIDTH,
                        cropping: true,
                        multiple: true,
                        mediaType: 'photo',
                        includeBase64: false,
                        multipleShot: false,
                        compressImageQuality: 0.7
                    }).then(images => {
                        console.log("Selected Image : " + JSON.stringify(images))
                        setIsLoading(false)
                        setVenueImage(images)
                        setIsImageUpdate(true)

                    }).catch((error) => {

                        setIsLoading(false)
                        console.log(error)
                    });

                },
                style: 'default'
            },
        ])

    }
    return (
        <>
            <HeaderView title={"Add Venue"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
                titleColor={white}>
                <View style={{ margin: pixelSizeHorizontal(20) }}>
                    {console.log("venueImage", venueImage)}
                    {venueImage &&
                        <>
                            <FlatList
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    {
                                        useNativeDriver: false,
                                    }
                                )}
                                initialScrollIndex={index}
                                onViewableItemsChanged={_onViewableItemsChanged}
                                viewabilityConfig={_viewabilityConfig}
                                decelerationRate={'normal'}
                                scrollEventThrottle={16}
                                data={venueImage}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View style={{  }}>
                                        <FastImage
                                            style={{ flex: 1,width:SCREEN_WIDTH-35,height:200 }}
                                            source={{ uri: item.path }}
                                            resizeMode="cover"
                                        />
                                        <TouchableOpacity onPress={() => { deleteItem(item) }}
                                        style={{
                                            position:"absolute",
                                            right:10,
                                            top:4,
                                            borderRadius:16,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            backgroundColor: white,
                                            width:32,
                                            height:32,
                                            shadowColor: black05,
                                            shadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            shadowOpacity: 0.17,
                                            shadowRadius: 8,
                                            elevation: 3
                                        }}>
                                            <Icon  name="trash-can-outline" color={primary} size={26} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                                        <View style={{  flexDirection: 'row', alignContent:"center",justifyContent:"center",}}>
                                            {venueImage.map((item, inx) => (
                                                <View
                                                    key={inx}
                                                    style={[
                                                        styles.dotView,
                                                        { backgroundColor: inx == index ? primary : secondary},
                                                    ]}></View>
                                            ))}
                                        </View>
                        </>
                    }
                    <TouchableOpacity onPress={() => UploadImage()}
                        style={{
                            borderColor: primary,
                            borderWidth: 1,
                            borderRadius: widthPixel(5),
                            padding: pixelSizeHorizontal(10),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: FontSize.FS_16,
                            color: primary,
                            fontFamily: MEDIUM,
                        }}>ADD IMAGE</Text>
                    </TouchableOpacity>
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
    paginationWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
      dotView: {
        marginVertical:10,
        width: 12,
        height: 12,
        borderRadius: 20,
        backgroundColor: primary,
        marginLeft: 10,
      },
    
})

export default AddVenue