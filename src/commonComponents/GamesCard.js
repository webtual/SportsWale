import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { RUPEE, SCREEN_WIDTH } from "../constants/ConstantKey";
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from "../constants/Fonts";
import { Colors } from "../constants/CustomeColor";
import { ic_navigation, money, siren } from "../constants/Images";
import Translate from "../translation/Translate";
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./ResponsiveScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import { navigate } from "../navigations/RootNavigation";
import {
  black,
  black05,
  dim_grey,
  primary,
  primary_light,
  secondary,
  white,
} from "../constants/Color";
import MoneyIcon from "../assets/images/MoneyIcon";
import NavigationIcon from "../assets/images/NavigationIcon";
import moment from "moment";
import { useSelector } from "react-redux";
import CommonStyle from "./CommonStyle";
import SirenIcon from "../assets/images/SirenIcon";

export default function GamesCard({ cardStyles, bookMark, item }) {
  const userData = useSelector((state) => state.userRedux.user_data);

  return (
    <TouchableOpacity
      onPress={() => navigate("GameDetails", { game_data: item })}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: white,
          // minHeight: 190,
          // height: 160,
          borderRadius: 10,
          // shadowColor: black05,
          // shadowOffset: {
          //   width: 0,
          //   height: 3,
          // },
          // shadowOpacity: 0.17,
          // shadowRadius: 8,
          // elevation: 3,
          alignSelf: "center",
          paddingLeft: 10,
          paddingVertical: 10,
        },
        CommonStyle.shadow,
        cardStyles,
      ]}
    >
      {bookMark ? (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 5,
          }}
        >
          <Icon name={"bookmark-outline"} size={22} color={black} />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: REGULAR,
            fontSize: FontSize.FS_12,
            color: dim_grey,
            flex: 1,
          }}
        >
          {item?.venue_ground_title}
        </Text>
        <Text
          style={{
            fontFamily: SEMIBOLD,
            fontSize: FontSize.FS_12,
            color: black,
            marginRight: pixelSizeHorizontal(10),
          }}
        >
          {moment(item?.event_date).format("DD MMM, YYYY")} | {item?.display_event_start_time} 
          {/* Fri,25 Aug,7:00PM */}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: BOLD,
          fontSize: FontSize.FS_16,
          color: black,
        }}
      >
        {item?.game_title}
      </Text>

      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
          alignItems: "center",
          marginTop: pixelSizeHorizontal(12),
        }}
      >
        {item?.game_participants.length ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* First Image */}
            {item?.game_participants.length >= 1 && (
              <View style={[{
                width: 48,
                height: 48,
                borderRadius: 48 / 2,
                borderWidth: 3,
                borderColor: white,
                backgroundColor : white,
                overflow:'hidden'
              },CommonStyle.shadow]}>
              <FastImage
                style={{flex:1}}
                source={{
                  uri: userData?.asset_url + item?.game_participants[0].profile,
                }}
                resizeMode="cover"
              />
              </View>
            )}

            {/* Second Image */}
            {item?.game_participants.length >= 2 && (
             <View style={[{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginLeft: -15,
              borderWidth: 3,
              borderColor: white,
              backgroundColor : white,
              overflow:'hidden'
            },CommonStyle.shadow]}>
             <FastImage
                style={{flex:1}}
                source={{
                  uri: userData?.asset_url + item?.game_participants[1].profile,
                }}
                resizeMode="cover"
              />
              </View>
            )}

            {/* Third Image */}
            {item?.game_participants.length >= 3 && (
              <View style={[{backgroundColor:white, width: 32,
                height: 32,
                borderRadius: 16,
                marginLeft: -10,
                borderWidth: 3,
                borderColor: white,
                overflow:'hidden'
                },CommonStyle.shadow]}>
              <FastImage
                style={[{
                 flex:1
                }]}
                source={{
                  uri: userData?.asset_url + item?.game_participants[2].profile,
                }}
                resizeMode="cover"
              />
              </View>
            )}
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_16,
              color: black,
            }}
          >
            {" "}
            • {item?.total_join_players}/{item?.total_player} Playing
          </Text>
        </View>
        <View style={styles.moneyContainer}>
          <MoneyIcon />
          <Text
            style={[
              styles.text,
              { color: black, marginLeft: pixelSizeHorizontal(5) },
            ]}
          >
            {RUPEE + parseInt(item?.cost_per_player_amount)}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.itemContainer, { backgroundColor: primary }]}>
          {/* <Icon name={"soccer"} size={20} color={white} /> */}
          <FastImage
            source={{ uri: userData?.asset_url + item?.game_image }}
            style={{ width: widthPixel(20), height: widthPixel(20) }}
            resizeMode="contain"
            tintColor={white}
          />
          <Text
            style={[
              styles.text,
              {
                color: white,
                fontSize: FontSize.FS_12,
                marginLeft: pixelSizeHorizontal(5),
              },
            ]}
          >
            {item?.game_skill_level}
          </Text>
        </View>

        <View
          style={[styles.itemContainer, { backgroundColor: primary_light }]}
        >
          {/* <FastImage
            style={{
              width: 20,
              height: 20,
            }}
            source={siren}
            resizeMode={'contain'}
          /> */}
          <SirenIcon width={19} height={19}/>
          <Text
            style={[
              styles.text,
              { color: black, marginLeft: pixelSizeHorizontal(5) },
            ]}
          >
            Only {item?.spot_left} Slot left
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            marginTop: pixelSizeVertical(10),
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <NavigationIcon />
          <Text
            style={[
              styles.text,
              {
                color: black,
                fontSize: FontSize.FS_12,
                marginLeft: pixelSizeHorizontal(5),
              },
            ]}
          >
            {item?.venue_title}
          </Text>
        </View>

        <View style={styles.bookContainer}>
          <Text style={[styles.text, { color: white }]}>Booked</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  moneyContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: primary_light,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemContainer: {
    padding: 5,
    marginVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: pixelSizeHorizontal(10),
  },

  bookContainer: {
    paddingVertical: 5,
    backgroundColor: secondary,
    paddingHorizontal: pixelSizeHorizontal(15),
    borderRadius: 6,
    alignItems: "center",
    marginRight: pixelSizeHorizontal(10),
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_11,
  },
});
