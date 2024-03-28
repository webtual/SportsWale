import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/CustomeColor";
import FastImage from "react-native-fast-image";
import { venue } from "../constants/Images";
import { pixelSizeHorizontal, pixelSizeVertical } from "./ResponsiveScreen";
import { SCREEN_WIDTH } from "../constants/ConstantKey";
import { BOLD, FontSize, SEMIBOLD, MEDIUM } from "../constants/Fonts";
import Divider from "./Divider";
import { navigate } from "../navigations/RootNavigation";
import { black, black05, dim_grey, primary_light, white } from "../constants/Color";
import IconButton from "./IconButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function VenuesCard({ item , styles }) {
  console.log('navigate', navigate);
  return (
    <TouchableOpacity
      onPress={() => navigate("VenueDetail", { item: item })}
      activeOpacity={0.7}
      style={[{
        backgroundColor: white,
        borderRadius: 10,
        // minHeight: 190,
        shadowColor: black05,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 8,
        elevation: 3,
        // alignSelf: "center",
      },
    {...styles}
    ]}
    >
      <View>
      <FastImage
        style={{
          width: "100%",
          height: 100,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={venue}
        resizeMode="cover"
      />
      <IconButton additionalStyle={{position : 'absolute', bottom : 10, right : 10}}
      onPress={() => {}}>
        <Icon name={"heart-outline"} size={24} color={white}/>
      </IconButton>
      </View>
      <View
        style={{
          marginVertical: pixelSizeHorizontal(10),
          marginHorizontal: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: BOLD,
                fontSize: FontSize.FS_14,
                color: black,
              }}
            >
              {item.venueName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: primary_light,
              padding: 5,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_11,
                color: black,
              }}
            >
              4.5 (147)
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: SEMIBOLD,
            fontSize: FontSize.FS_10,
            color: dim_grey,
          }}
        >
          S.P. ring Road
        </Text>
        <Divider style={{ marginVertical: pixelSizeVertical(10) }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_10,
              color: dim_grey,
            }}
          >
            Pricing Starting From
          </Text>
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_10,
              color: black,
            }}
          >
            INR 1000 Onwards
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
