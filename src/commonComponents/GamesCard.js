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

export default function GamesCard({ cardStyles, bookMark }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("VenueDetail", { item: item })}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: Colors.white,
          minHeight: 190,
          // height: 160,
          borderRadius: 10,
          shadowColor: Colors.black05,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 8,
          elevation: 3,
          alignSelf: "center",
          paddingLeft: 10,
          paddingVertical: 5,
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
          <Icon name={"bookmark-outline"} size={22} color={Colors.black} />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>6 a side</Text>
        <Text
          style={{
            fontFamily: BOLD,
            fontSize: FontSize.FS_14,
            color: Colors.black,
            marginRight: pixelSizeHorizontal(10),
          }}
        >
          Fri,25 Aug,7:00PM
        </Text>
      </View>
      <Text
        style={{
          fontFamily: BOLD,
          fontSize: FontSize.FS_15,
          color: Colors.black,
        }}
      >
        FootBall
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            marginTop: 8,
          }}
        >
          {/* First Image */}
          <FastImage
            style={{
              width: 55,
              height: 55,
              borderRadius: 25,
              overflow: "hidden",
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            resizeMode="cover"
          />

          {/* Second Image */}
          <FastImage
            style={{
              width: 45,
              height: 45,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              left: 35,
              borderWidth: 3,
              borderColor: Colors.white,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            resizeMode="cover"
          />

          {/* Third Image */}
          <FastImage
            style={{
              width: 35,
              height: 35,
              borderRadius: 15,
              position: "absolute",
              top: 15,
              left: 65,
              borderWidth: 3,
              borderColor: Colors.white,
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.moneyContainer}>
          <FastImage
            style={{
              width: 25,
              height: 25,
            }}
            source={money}
            resizeMode="cover"
          />

          <Text style={[styles.text, { color: Colors.black }]}>INR 499</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.itemContainer, { backgroundColor: Colors.primary }]}
        >
          <Icon name={"soccer"} size={20} color={Colors.white} />
          <Text style={[styles.text, { color: Colors.white }]}>
            Intermediate
          </Text>
        </View>

        <View
          style={[
            styles.itemContainer,
            { backgroundColor: Colors.primaryLight },
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
          <Text style={[styles.text, { color: Colors.black }]}>
            Only 5 Slot left
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            marginVertical: pixelSizeVertical(10),
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <FastImage
            style={{
              width: 18,
              height: 18,
            }}
            source={ic_navigation}
            resizeMode="cover"
          />
          <Text style={[styles.text, { color: Colors.black, marginLeft: 5 }]}>
            Vistara Venue
          </Text>
        </View>

        <View style={styles.bookContainer}>
          <Text style={[styles.text, { color: Colors.white }]}>Booked</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  moneyContainer: {
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: Colors.primaryLight,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 0.5,
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
    marginVertical: pixelSizeVertical(10),
    backgroundColor: Colors.secondary,
    paddingHorizontal: pixelSizeHorizontal(15),
    borderRadius: 6,
    alignItems: "center",
    marginRight: pixelSizeHorizontal(10),
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_14,
  },
});
