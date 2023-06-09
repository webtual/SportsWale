
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, FlatList, Image, Alert } from 'react-native'
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
import { ADD_GAME_TO_PROFILE, GET_GAMES, GET_GAME_TO_PROFILE, IMAGE_URL, REMOVE_GAME_TO_PROFILE } from '../../constants/ApiUrl'
import ApiManager from '../../commonComponents/ApiManager'
import { Toast } from 'native-base'
import { getData } from '../../commonComponents/AsyncManager'
import { USER_DATA } from '../../constants/ConstantKey'

const RegisterSelectSport = ({ }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedList, setSelectedList] = useState([])
    const [gameList, setGameList] = useState([])
    const [userData, setUserData] = useState(null)

    useFocusEffect(
        useCallback(() => {
            Api_Get_Games(true)
            getUserData()
        }, [])
    );

    const Api_Get_Games = (isLoad) => {
        setIsLoading(isLoad)
        ApiManager.post(GET_GAMES, {
            apikey: '123',
        }).then((response) => {
            setIsLoading(false)
            var data = response.data;
            // Log("GET GAMES RESPONSE :", data)
            if (data.Status == 1) {
                var games_data = JSON.parse(data.Data)
                // Log("GET GAMES RESPONSE :", games_data)
                setGameList(games_data)
            } else {
                Toast.show({
                    description: data?.Msg
                })
            }
        }).catch((err) => {
            setIsLoading(false)
            console.error("Api_Get_Games Error ", err);
        })
    }

    const SelectIntrest = (item) => {
        var selectedData = [...selectedList]
        let filter = selectedData.filter(x => x.games_id === item.games_id)
        if (filter.length) {
            Api_Remove_game_to_profile(filter[0])
        } else {
            Api_Add_game_to_profile(item)
        }
    }
    const checkExists = (item) => {
        let filter = selectedList.filter(x => x.games_id === item.games_id)
        if (filter.length) {
            return true
        }
        else {
            return false
        }
    }
    const getUserData = () => {
        getData(USER_DATA, (data) => {
            // Log("USER_DATA: " + JSON.stringify(data))
            setUserData(data)
            Api_Get_game_to_profile(data)
        })
    }

    const Api_Add_game_to_profile = (data) => {
        ApiManager.post(ADD_GAME_TO_PROFILE, {
            apikey: '123',
            users_id: userData.users_id,
            games_id: data?.games_id,
            isTrainer: false,
            skill: "Advanced",
        }).then((response) => {
            var data = response.data;
            Log("ADD GAME RESPONSE :", data)
            if (data.Status == 1) {
                Api_Get_game_to_profile(userData)
                Toast.show({
                    description: data?.Msg
                })
            } else {
                Toast.show({
                    description: data?.Msg
                })
            }

        }).catch((err) => {
            console.error("Api_Add_game_to_profile Error ", err);
        })
    }

    const Api_Remove_game_to_profile = (data) => {

        ApiManager.post(REMOVE_GAME_TO_PROFILE, {
            apikey: '123',
            users_games_id: data?.users_games_id,
        }).then((response) => {
            var data = response.data;
            Log("REMOVE GAME RESPONSE :", data)
            if (data.Status == 1) {
                Api_Get_game_to_profile(userData)
                Toast.show({
                    description: data?.Msg
                })
            } else {
                Toast.show({
                    description: data?.Msg
                })
            }

        }).catch((err) => {
            console.error("Api_Remove_game_to_profile Error ", err);
        })
    }
    const Api_Get_game_to_profile = (data) => {
        ApiManager.post(GET_GAME_TO_PROFILE, {
            apikey: '123',
            users_id: data.users_id,
        }).then((response) => {
            var data = response.data;
            Log("GET USERS GAME RESPONSE :", data)
            if (data.Status == 1) {
                var selected_game_data = JSON.parse(data.Data)
                setSelectedList(selected_game_data)
            } else {
                Toast.show({
                    description: data?.Msg
                })
            }

        }).catch((err) => {
            console.error("Api_Remove_game_to_profile Error ", err);
        })
    }

    const OnPressNext = () => {
        console.log("selectedList", selectedList.length)
        if (selectedList.length <= 2) {
            alert("Select atleast two games")
        }
        else {
            navigate('RegisterWhatLearn')
        }


    }
    return (
        <>
            <HeaderView HeaderSmall={true}
                title={Translate.t("participate")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_20, color: black, margin: 5 }}>{Translate.t("select_sport")}</Text>

                    <FlatList
                        numColumns={3}
                        data={gameList}
                        contentContainerStyle={{

                        }}
                        renderItem={({ item }) => (
                            <View style={{
                                alignItems: "center", marginVertical: 14,
                                justifyContent: "center", flex: 1
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
                                    <Image
                                        source={{ uri: IMAGE_URL + item.gameicon }}
                                        style={{
                                            width: 42, height: 42,
                                            borderRadius: 25, tintColor: checkExists(item) == true ? white : primary
                                        }}>

                                    </Image>
                                </TouchableOpacity>
                                <Text numberOfLines={2} style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: black, marginVertical: 5, flex: 1 }}>{item.name}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => { OnPressNext() }}
                        style={[CommonStyle.mainBtnStyle, { marginBottom: 30 }]}>
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

export default RegisterSelectSport


