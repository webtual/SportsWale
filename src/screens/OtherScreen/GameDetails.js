import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import IconButton from "../../commonComponents/IconButton";
import {
  black,
  offWhite,
  primary,
  primary_light,
  white,
} from "../../constants/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import { useToast } from "native-base";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import LoadingView from "../../commonComponents/LoadingView";
import ApiManager from "../../commonComponents/ApiManager";
import { GAME_DETAILS } from "../../constants/ApiUrl";
import moment from "moment";
import BasicCard from "../../commonComponents/BasicCard";
import CommonStyle from "../../commonComponents/CommonStyle";
import NavigationIcon from "../../assets/images/NavigationIcon";
import FastImage from "react-native-fast-image";

const GameDetails = (props) => {
  const toast = useToast();

  const { game_data } = props?.route?.params;

  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);

  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    Api_Get_Game_Details(true);
  }, []);

  const Api_Get_Game_Details = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("venue_user_game_id", game_data?.id);

    ApiManager.post(GAME_DETAILS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Game_Details : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setGameDetails(response.data.data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Game_Details Error ", err);
      });
  };

  const filterGameHost = () => {
    var host = gameDetails?.game_participants?.filter(
      (users) => users?.user_id == gameDetails?.user_id
    );
    return host?.[0] || null;
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={""}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
        rightComponent={
          <View style={{ alignItems: "center" }}>
            <IconButton additionalStyle={{}} onPress={() => {}}>
              <Icon name={"share-variant"} size={24} color={white} />
            </IconButton>
          </View>
        }
      >
        {gameDetails && (
          <View style={{}}>
            <Text
              style={[
                styles.titletext,
                {
                  fontSize: FontSize.FS_20,
                  marginTop: pixelSizeHorizontal(20),
                },
              ]}
            >
              {gameDetails?.game_title}
            </Text>

            <Text
              style={[
                {
                  fontSize: FontSize.FS_16,
                  fontFamily: MEDIUM,
                  color: black,
                  marginTop: pixelSizeHorizontal(12),
                },
              ]}
            >
              {moment(gameDetails?.event_date).format("DD MMM, YYYY")} |{" "}
              {gameDetails?.event_start_time} - {gameDetails?.event_end_time}
            </Text>

            <View
              style={[
                styles.card,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: pixelSizeHorizontal(10),
                },
                CommonStyle.shadow,
              ]}
            >
              <NavigationIcon width={widthPixel(20)} height={widthPixel(20)} />
              <Text
                style={{
                  fontFamily: MEDIUM,
                  fontSize: FontSize.FS_13,
                  color: black,
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                {gameDetails?.venue_location}
              </Text>
            </View>

            <View
              style={[
                styles.card,
                { marginTop: pixelSizeHorizontal(10) },
                CommonStyle.shadow,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.titletext, { flex: 1 }]}>
                  Players ({gameDetails?.game_participants.length})
                </Text>

                <Text
                  style={{
                    color: black,
                    fontSize: FontSize.FS_12,
                    fontFamily: MEDIUM,
                    marginRight: pixelSizeHorizontal(12),
                  }}
                >
                  See All
                </Text>
                <IconButton
                  additionalStyle={{
                    backgroundColor: primary,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: pixelSizeHorizontal(5),
                    borderRadius: widthPixel(50),
                  }}
                  onPress={() => {}}
                >
                  <Icon name={"chevron-right"} size={25} color={white} />
                </IconButton>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: pixelSizeHorizontal(12),
                }}
              >
                <FastImage
                  source={{
                    uri: userData?.asset_url + filterGameHost()?.profile,
                  }}
                  style={{
                    width: widthPixel(52),
                    height: widthPixel(52),
                    borderRadius: widthPixel(52),
                    borderWidth: pixelSizeHorizontal(2),
                    borderColor: white,
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    {
                      color: black,
                      fontSize: FontSize.FS_14,
                      fontFamily: BOLD,
                      flex: 1,
                      marginHorizontal: pixelSizeHorizontal(5),
                    },
                  ]}
                >
                  {filterGameHost()?.name}
                </Text>
                <View
                  style={[
                    styles.badgeView,
                    {
                      backgroundColor: primary_light,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: primary,
                      fontSize: FontSize.FS_10,
                      fontFamily: SEMIBOLD,
                    }}
                  >
                    Host
                  </Text>
                </View>

                {filterGameHost()?.skill && (
                  <View
                    style={[
                      styles.badgeView,
                      {
                        backgroundColor: offWhite,
                        marginLeft: pixelSizeHorizontal(5),
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: black,
                        fontSize: FontSize.FS_10,
                        fontFamily: SEMIBOLD,
                      }}
                    >
                      {filterGameHost()?.skill}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {gameDetails?.instructions &&
            <>
            <View
              style={[
                styles.card,
                { marginTop: pixelSizeHorizontal(20), flexDirection : 'row' },
                CommonStyle.shadow,
              ]}
            >
                <Icon name={"information"} size={25} color={primary}/>
                <Text
              style={[
                styles.titletext,
                {marginLeft : pixelSizeHorizontal(12)}
              ]}
            >
              Instructions
            </Text>
                </View>

                <View
              style={[
                styles.card,
                { marginTop: pixelSizeHorizontal(5) },
                CommonStyle.shadow,
              ]}
            >
                <Text style={{fontSize : FontSize.FS_12, color : black, fontFamily : REGULAR}}>
                {gameDetails?.instructions}
                </Text>
            </View>
                </>
            }

          </View>
        )}
      </HeaderView>
      <TouchableOpacity
        style={[
          CommonStyle.mainBtnStyle,
          {
            marginHorizontal: pixelSizeHorizontal(20),
            marginBottom: pixelSizeHorizontal(20),
          },
        ]}
        onPress={() => {}}
      >
        <Text style={CommonStyle.mainBtnText}>Join Game</Text>
      </TouchableOpacity>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: FontSize.FS_18,
    fontFamily: BOLD,
    color: black,
  },
  card: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    padding: pixelSizeHorizontal(12),
  },
  badgeView: {
    paddingVertical: pixelSizeHorizontal(5),
    paddingHorizontal: pixelSizeHorizontal(15),
    borderRadius: 5,
  },
});
export default GameDetails;
