
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Linking, Alert, Animated, Dimensions, Platform, PermissionsAndroid, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { black, black05, grey, light_grey, primary, secondary, secondary_dark_grey, warmGrey, warning, white, secondary_grey } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderView from '../commonComponents/HeaderView'
import { Input } from 'native-base'
import FastImage from 'react-native-fast-image'
import { SCREEN_WIDTH } from '../constants/ConstantKey'
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-crop-picker';
import AddModel from '../commonComponents/AddModel'
import Carousel from 'react-native-banner-carousel';

const AddVenue = ({ }) => {
var imagesAll = [];
    const [isLoading, setIsLoading] = useState(false)
    const [venueImage, setVenueImage] = useState(imagesAll)
    const [isImageUpdate, setIsImageUpdate] = useState(false)
    const [index, setIndex] = useState(0);
    const [isAddModal, setIsAddModal] = useState(false);
    const [isFacalitiesModal, setIsFacalitiesModal] = useState(false);
    const [selectedSportData, setSelectedSportData] = useState([]);
    const [selectedFacalitiesData, setSelectedFacalitiesData]= useState([]);
    const [VenueAddress, setVenueAddress] = useState("");
    const [VenueLink, setVenueLink] = useState("");
    const [VenueName, setVenueName] = useState("");
    const [pageIndex, setPageIndex] = useState(0);

    const scrollRef = useRef(null);

    useEffect(() => {
        onOpneScanner()
    }, [])

    const AddModal = () => {
        setIsAddModal(!isAddModal);
    };
    const facalitiesModal = () => {
        setIsFacalitiesModal(!isFacalitiesModal);
    };
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
                        //   alert("CAMERA permission denied")
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

    // const scrollX = React.useRef(new Animated.Value(0)).current;
    // const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    //     console.log("viewableItems", viewableItems)
    //     setIndex(viewableItems[0]?.index);
    // }, []);

    // const _viewabilityConfig = {
    //     itemVisiblePercentThreshold: 50,
    // };
   const  renderPage = (image, index)=> {
    // console.log("image",image)
    // console.log("index",index)
        return (
            <View style={{ width:SCREEN_WIDTH,height:200 }}>
            <FastImage
                style={{flex:1  }}
                source={{ uri: image.path }}
                resizeMode="cover"
            />
            <TouchableOpacity onPress={() => { deleteItem(image) }}
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
        );
    }
    const deleteItem = (item) => {
        console.log("deleteItem", item)
        var newlist = [...venueImage]
        console.log("newlist", newlist)

        let filterData = newlist.filter(s => s.path !== item.path)
        console.log("filterData", filterData)
        setVenueImage(filterData)
        setPageIndex(pageIndex - 1)
        
    }

    const deleteItemSport = (item) => {
        var newlist = [...selectedSportData]
        console.log("newlist", newlist)

        let filterData = newlist.filter(s => s.id !== item.id)
        console.log("filterData", filterData)
        setSelectedSportData(filterData)
    }
    const deleteItemFacalities = (item) => {
        var newlist = [...selectedFacalitiesData]
        console.log("newlist", newlist)

        let filterData = newlist.filter(s => s.id !== item.id)
        console.log("filterData", filterData)
        setSelectedFacalitiesData(filterData)
    }
    const AddVenue = () => {
        console.log("ADD ::::",selectedSportData + "\n" + selectedFacalitiesData + "\n" + VenueName + "\n" + VenueAddress + "\n" + VenueLink)
        navigate('Venue')
    }

    const UploadImage = () => {
        console.log("venueImage.length",venueImage.length)
        if(venueImage.length < 3){
        console.log("if")
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
                        freeStyleCropEnabled: true,
                        cropping: true,
                        mediaType: 'photo',
                        includeBase64: false,
                        compressImageQuality: 0.7
                    }).then(images => {
                        // console.log("Selected Image  " + JSON.stringify(images))
                        console.log("Selected Images " + imagesAll)
                        var img = [...venueImage]
                        img.push(images)
                        setVenueImage(img)
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
                        maxFiles:3,
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
    else{
        console.log("else")
    }
    }
    return (
        <>
            <HeaderView title={"Add Venue"} onPress={() => goBack()} isBack={true} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
                titleColor={white}>
                    
                    {venueImage.length ?
                    <Carousel
                    autoplay={false}
                    ref={scrollRef}
                    // autoplayTimeout={5000}
                    loop={false}
                    index={pageIndex}
                    pageSize={SCREEN_WIDTH}
                    pageIndicatorOffset={16}
                    // showsPageIndicator={venueImage.length ==1 ? false : true}
                    onPageChanged={(index) => {
                        console.log("index ::::::",index)
                        setPageIndex(index)}}
                >
                    
                    {venueImage.map((image, index) =>renderPage(image, index))}
                </Carousel>
                : null}
                <View style={{ margin: pixelSizeHorizontal(20) }}>
                
                    {/* {console.log("venueImage", venueImage)}
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
                    }*/}
                    <TouchableOpacity onPress={() => UploadImage()}
                        style={styles.outlineBtn}>
                        <Text style={styles.outlineBtnText}>SELECT IMAGES</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                        <Text style={{
                            fontSize: FontSize.FS_19,
                            color: black,
                            fontFamily: MEDIUM,
                            marginBottom:pixelSizeHorizontal(10)

                        }}>
                            Venue Details
                        </Text>
                        <Text style={styles.inputTitle}>Name</Text>
                        <View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder={"Name"}
                                onChangeText={(text) => setVenueName(text)}
                            />
                        </View>

                        <Text style={styles.inputTitle}>Address</Text>
                        <View>
                            <TextInput multiline={true} returnKeyType={'next'}
                                style={styles.inputStyle}
                                placeholder={"Address"}
                                onChangeText={(text) => setVenueAddress(text)}
                            />
                        </View>

                        <Text style={styles.inputTitle}>Address link(optional)</Text>
                        <View>
                            <TextInput returnKeyType={'next'}
                                style={styles.inputStyle}
                                placeholder={"Address link"}
                                onChangeText={(text) => setVenueLink(text)}
                            />
                        </View>

                    </View>

                    <Text style={styles.inputTitle}>Select Sports</Text>
                    {selectedSportData &&
                        <FlatList
                            style={styles.flatListStyle}
                            data={selectedSportData}
                            contentContainerStyle={styles.flatListContainerStyle}
                            renderItem={({ item }) => (
                                <View style={styles.flatListItemOutline}>
                                    <Icon name={item.SportImage} size={24} color={primary} />
                                    <Text style={styles.flatListItemText}>{item.SportName}</Text>
                                    <TouchableOpacity onPress={() => { deleteItemSport(item) }} style={styles.flatListClosIcon}>
                                        <Icon name={"close"} size={16} color={black} />
                                    </TouchableOpacity>
                                </View>

                            )}
                        />}
                    <TouchableOpacity onPress={() => { AddModal() }} style={styles.outlineBtn}>
                        <Text style={styles.outlineBtnText}>SELECT SPORTS</Text>
                    </TouchableOpacity>
                    <Text style={styles.inputTitle}>Select Amenties/Facalities</Text>
                    {selectedFacalitiesData &&
                        <FlatList
                            style={styles.flatListStyle}
                            data={selectedFacalitiesData}
                            contentContainerStyle={styles.flatListContainerStyle}
                            renderItem={({ item }) => (
                                <View style={styles.flatListItemOutline}>
                                    <Text style={styles.flatListItemText}>{item.SportName}</Text>
                                    <TouchableOpacity onPress={() => { deleteItemFacalities(item) }}
                                        style={styles.flatListClosIcon}>
                                        <Icon name={"close"} size={16} color={black} />
                                    </TouchableOpacity>
                                </View>

                            )}
                        />}
                    <TouchableOpacity onPress={() => { facalitiesModal() }}
                        style={styles.outlineBtn}>
                        <Text style={styles.outlineBtnText}>SELECT AMENITIES/FACALITIES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { AddVenue() }}
                        style={styles.primaryBtn}>
                        <Text style={styles.primaryBtnText}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <AddModel
                    isFacalities={false}
                    title={"Available Sport"}
                    isAddVisible={isAddModal}
                    toggleModel={() => AddModal()}
                    selected_sport={selectedSportData}
                    onAddVenue={(data) => {
                        console.log("selected data : ", data)
                        setSelectedSportData(data)
                    }} />
                <AddModel
                    isFacalities={true}
                    title={"Amenities/Facalities"}
                    isAddVisible={isFacalitiesModal}
                    toggleModel={() => facalitiesModal()}
                    selected_sport={selectedFacalitiesData}
                    onAddVenue={(data) => {
                        console.log("selected data : ", data)
                        setSelectedFacalitiesData(data)
                    }} />
            </HeaderView>

        </>
    )
}


const styles = StyleSheet.create({
    flatListStyle: {
        marginVertical: 5,
    },
    flatListClosIcon: {
        marginTop: 2,
        marginHorizontal: 10,
    },
    flatListItemText: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_14,
        color: black,
        marginLeft: 5,
    },
    inputTitle: {
        fontSize: FontSize.FS_17,
        color: warmGrey,
        fontFamily: REGULAR,
        marginTop: 10,
    },
    flatListItemOutline: {
        borderWidth: 1,
        borderColor: primary,
        paddingHorizontal: 6,
        paddingVertical: 10,
        backgroundColor: secondary,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
    },
    flatListContainerStyle: {
        flexDirection: 'row',
        alignSelf: "flex-start",
        flexWrap: 'wrap',
    },
    primaryBtnText: {
        fontSize: FontSize.FS_15,
        color: white,
        fontFamily: MEDIUM,
    },
    primaryBtn: {
        backgroundColor: primary,
        borderRadius: widthPixel(5),
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: pixelSizeHorizontal(20),
    },
    outlineBtnText: {
        fontSize: FontSize.FS_15,
        color: primary,
        fontFamily: MEDIUM,
    },
    outlineBtn: {
        borderColor: primary,
        borderWidth: 1,
        borderRadius: widthPixel(5),
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        borderRadius: widthPixel(5),
        borderWidth: 2,
        borderColor: primary,
        paddingHorizontal: pixelSizeHorizontal(10),
        marginTop: pixelSizeHorizontal(10),
        fontSize: 15,
        paddingVertical: 5,
    },

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
        marginVertical: 10,
        width: 12,
        height: 12,
        borderRadius: 20,
        backgroundColor: primary,
        marginLeft: 10,
    },

})

export default AddVenue