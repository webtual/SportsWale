import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SCREEN_WIDTH } from "../constants/ConstantKey";
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
import { black, black05, dim_grey, primary, primary_light, secondary, white } from "../constants/Color";
import MoneyIcon from "../assets/images/MoneyIcon";
import NavigationIcon from "../assets/images/NavigationIcon";

export default function GamesCard({ cardStyles, bookMark, item }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("VenueDetail", { item: item })}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: white,
          // minHeight: 190,
          // height: 160,
          borderRadius: 10,
          shadowColor: black05,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 8,
          elevation: 3,
          alignSelf: "center",
          paddingLeft : 10,
          paddingVertical: 10,
        },
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
        <Text style={{fontFamily : REGULAR, fontSize : FontSize.FS_12, color :dim_grey, flex:1}}>6 a side</Text>
        <Text
          style={{
            fontFamily: SEMIBOLD,
            fontSize: FontSize.FS_12,
            color: black,
            marginRight : pixelSizeHorizontal(10)
          }}
        >
          Fri,25 Aug,7:00PM
        </Text>
      </View>
      <Text
        style={{
          fontFamily: BOLD,
          fontSize: FontSize.FS_16,
          color: black,
        }}
      >
        FootBall
      </Text>

      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
          alignItems: "center",
          marginTop: pixelSizeHorizontal(12),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* First Image */}
          <FastImage
            style={{
              width: 48,
              height: 48,
              borderRadius: 48/2,
              overflow: "hidden",
              borderWidth: 3,
              borderColor: white,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            resizeMode="cover"
          />

          {/* Second Image */}
          <FastImage
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginLeft : -15,
              borderWidth: 3,
              borderColor: white,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            resizeMode="cover"
          />

          {/* Third Image */}
          <FastImage
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginLeft : -10,
              borderWidth: 3,
              borderColor: white,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{flex:1}}>
            <Text style={{fontFamily : SEMIBOLD, fontSize : FontSize.FS_16, color : black}}>
            {" "}•{" "}5/11 Playing
            </Text>
        </View>
        <View style={styles.moneyContainer}>
         
          <MoneyIcon />
          <Text style={[styles.text, { color: black, marginLeft : pixelSizeHorizontal(5) }]}>INR 499</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row"}}>
        <View
          style={[styles.itemContainer, { backgroundColor: primary }]}
        >
          <Icon name={"soccer"} size={20} color={white} />
          <Text style={[styles.text, { color: white , fontSize : FontSize.FS_12, marginLeft : pixelSizeHorizontal(5)}]}>
            Intermediate
          </Text>
        </View>

        <View
          style={[
            styles.itemContainer,
            { backgroundColor: primary_light },
          ]}
        >
          <FastImage
            style={{
              width: 20,
              height: 20,
            }}
            source={siren}
            resizeMode="cover"
          />
          <Text style={[styles.text, { color: black,marginLeft : pixelSizeHorizontal(5) }]}>
            Only 5 Slot left
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems : 'center'
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            marginTop: pixelSizeVertical(10),
            alignItems: "center",
            flexDirection: "row",
            flex:1,
          }}
        >
         
          <NavigationIcon/>
          <Text style={[styles.text, { color: black, fontSize : FontSize.FS_12, marginLeft: pixelSizeHorizontal(5) }]}>
            Vistara Venue
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
    paddingHorizontal:5,
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
