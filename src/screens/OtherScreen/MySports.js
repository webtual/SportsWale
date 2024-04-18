import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { storeData } from "../../commonComponents/AsyncManager";
import { USER_DATA } from "../../constants/ConstantKey";
import { storeUserData, user_data } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "native-base";
import ApiManager from "../../commonComponents/ApiManager";
import { DELETE_USER_GAME, GET_PROFILE, UPDATE_USER_GAME } from "../../constants/ApiUrl";
import LoadingView from "../../commonComponents/LoadingView";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  black,
  dim_grey,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import { BOLD, FontSize, SEMIBOLD } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import CommonStyle from "../../commonComponents/CommonStyle";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const MySports = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    Api_Get_Profile(true);
  }, []);

  const Api_Get_Profile = (isLoad) => {
    setIsLoading(isLoad);
    ApiManager.get(GET_PROFILE + userData?.id, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Profile : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var profile_data = response.data.data;

          storeData(USER_DATA, profile_data, () => {
            dispatch(storeUserData(profile_data));
          });
          setProfileData(profile_data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Profile Error ", err);
      });
  };

  const Api_Update_Game = (isLoad, games) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("game_selection", JSON.stringify(games.map((el) => ({  game_id: el.game_id , level : el.level }))));

    ApiManager.put(UPDATE_USER_GAME + userData?.id,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Update_Game : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {

          toast.show({
            description: response.data.message,
          });

          Api_Get_Profile(true)
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Update_Game Error ", err);
      });
  };

  const Api_Delete_Game = (isLoad, games) => {
    setIsLoading(isLoad);

    // const formData = new FormData();
    // formData.append("game_selection", JSON.stringify(games.map((el) => ({  game_id: el.game_id , level : el.level }))));

    ApiManager.delete(DELETE_USER_GAME + games?.game_id, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Delete_Game : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {

          toast.show({
            description: response.data.message,
          });

          Api_Get_Profile(true)
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Delete_Game Error ", err);
      });
  };

  const btnRemoveTap = (item) => {

    Dialog.show({
      type: ALERT_TYPE.WARNING,
        title: "Alert",
        textBody: `Are you sure you want to delete ${item?.game_title}?`,
        button: 'Delete',
        onPressButton: ()=> {
            Dialog.hide();
            Api_Delete_Game(true,item)
           //console.log("Logout successfully")
          },
    
    })

    // let newData = profileData?.game_selection.filter(function (data) {
    //   return data.id != item.id;
    // });

    // setProfileData({ ...profileData, game_selection: newData });
  };

  const onSelectGames = (selected_games) => {
    var final_games = [ selected_games];
    console.log("final_games : ", final_games);
    Api_Update_Game(true,selected_games)
   
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Sports"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.btnSelected]}
            onPress={() => {
              navigate("AddSports", {
                addedGames: profileData?.game_selection,
                onSelectGames: (selected_games) => {
                  onSelectGames(selected_games);
                },
              });
            }}
          >
            <Icon name={"plus"} size={20} color={white} />
            <Text
              style={[styles.btnText, { marginLeft: pixelSizeHorizontal(5) }]}
            >
              Add Sports
            </Text>
          </TouchableOpacity>

          {profileData ? (
            <View>
              <FlatList
                scrollEnabled={false}
                data={profileData?.game_selection}
                ItemSeparatorComponent={
                  <View style={{ height: widthPixel(12) }} />
                }
                ListEmptyComponent={
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: pixelSizeHorizontal(30),
                    }}
                  >
                    <Text style={[styles.text, { color: dim_grey }]}>
                      No record found
                    </Text>
                  </View>
                }
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          height: widthPixel(50),
                          width: widthPixel(50),
                          borderRadius: widthPixel(25),
                          backgroundColor: primary_light,
                          padding: pixelSizeHorizontal(10),
                        }}
                      >
                        <FastImage
                          source={{
                            uri: userData?.asset_url + item?.game_image,
                          }}
                          resizeMode={"contain"}
                          style={{ flex: 1 }}
                        />
                      </View>
                      <Text
                        style={[
                          CommonStyle.titleText,
                          {
                            fontSize: FontSize.FS_14,
                            flex: 1,
                            marginHorizontal: pixelSizeHorizontal(10),
                          },
                        ]}
                      >
                        {item?.game_title}
                      </Text>
                      <TouchableOpacity onPress={() => btnRemoveTap(item)}>
                        <Icon name={"close"} size={25} color={black} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  btnSelected: {
    borderRadius: widthPixel(5),
    marginVertical: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(12),
    backgroundColor: secondary,
    minWidth: widthPixel(100),
    alignSelf: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    color: white,
    textAlign: "center",
    fontFamily: BOLD,
    fontSize: FontSize.FS_16,
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
});

export default MySports;
