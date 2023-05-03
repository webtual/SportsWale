
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { black, black05, grey, light_grey, offWhite, primary, secondary, warmGrey, white } from '../../constants/Color'

import Translate from '../../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
import IconButton from '../../commonComponents/IconButton'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderView from '../../commonComponents/HeaderView'
import FastImage from 'react-native-fast-image'

const Profile = () => {


    const btnLoginTap = () => {
        goBack()
    }

    return (
        <HeaderView title="Profile" isBack={false} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
            titleColor={white}  >
            <View style={{ marginVertical: pixelSizeHorizontal(10) }}>
                {/* <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center", flex: 1, backgroundColor: "black" }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        flex: 0.25,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 45,
                        shadowColor: black05,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 8,
                        elevation: 3,
                        marginRight:10
                    }}>
                        <FastImage
                            style={{ width: 75, height: 75, borderRadius: 40, }}
                            source={{ uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={{  backgroundColor: "green",flex:0.6,marginHorizontal:0 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, }}>Mike Smith</Text>

                        </View>
                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: warmGrey, }}>+91 90160899923</Text>
                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: warmGrey, }}>Abcd@gmail.com</Text>
                    </View>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            flex:0.1,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: black05,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.17,
                            shadowRadius: 8,
                            elevation: 3

                        }}>
                        <Icon name={"pencil-outline"} size={20} color={primary} />
                    </View>
                </View> */}
                <View style={{ marginHorizontal: pixelSizeHorizontal(20), flexDirection: "row", alignItems: "center" }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 45,
                        shadowColor: black05,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 8,
                        elevation: 3,
                        marginRight: 10
                    }}>
                        <FastImage
                            style={{ width: 75, height: 75, borderRadius: 40, }}
                            source={{ uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" }}
                            resizeMode="cover"
                        />
                        {/* <TouchableOpacity onPress={() => { }}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: white,
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: white,
                                shadowColor: black05,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.17,
                                shadowRadius: 8,
                                elevation: 3,
                            }}>
                            <Icon name={"camera-outline"} size={18} color={primary} />

                        </TouchableOpacity> */}
                    </View>


                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_16, color: black, }}>Mike Smith</Text>
                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: warmGrey, }}>+91 90160899923</Text>
                        <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: warmGrey, }}>Abcd@gmail.com</Text>
                        <View
                            style={{
                                position: "absolute",
                                top: -10,
                                right: 0,
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                shadowColor: black05,
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.17,
                                shadowRadius: 8,
                                elevation: 3
                            }}>
                            <Icon name={"pencil-outline"} size={20} color={primary} />
                        </View>
                    </View>
                </View>


                <View style={{ marginHorizontal: pixelSizeHorizontal(0), borderBottomWidth: 30, paddingVertical: 10, borderBottomColor: secondary, }}>
                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_18, color: black, textAlign: "center" }}>A winner is a dreamer who never gives up</Text>
                </View>


                <View style={{marginVertical:pixelSizeHorizontal(25)}}>
                    <TouchableOpacity style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"clipboard-list-outline"} size={20} color={primary} />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>My activities</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"heart-outline"} size={20} color={primary} />
                        <Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>Favourites</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"cog-outline"} size={20} color={primary} />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"account-multiple-plus-outline"} size={20} color={primary} />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>Invite a friend </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"help-circle-outline"} size={20} color={primary} />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>Help & support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"information-outline"} size={20} color={primary} />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => resetScreen("Login")}
                    style={{ marginHorizontal: pixelSizeHorizontal(20), borderBottomWidth: 1, borderBottomColor: grey, paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"logout-variant"} size={20} color={primary} />
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_15, color: black, marginLeft: 10 }}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </HeaderView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent: "center"
    },

})

export default Profile