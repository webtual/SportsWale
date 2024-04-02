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
import { black, black05, dim_grey, primary_light, secondary, white } from "../constants/Color";
import IconButton from "./IconButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from "react-redux";

export default function VenuesCard({ item , styles, isShowFavourite = true,...props}) {

 const userData = useSelector(state => state.userRedux.user_data);

  return (
    <TouchableOpacity
      onPress={() => navigate("VenueDetail", { venueData: item })}
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
        shadowRadius: 3,
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
        source={{uri :  userData?.asset_url +item?.image}}
        resizeMode="cover"
      />
      {isShowFavourite &&
      <IconButton additionalStyle={{position : 'absolute', bottom : 10, right : 10}}
      onPress={() => {props?.btnFavouriteTap()}}>
        <Icon name={item?.is_favourites ? "heart" : "heart-outline"} size={24} color={item?.is_favourites ? secondary : white}/>
      </IconButton>}
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
              {item.title}
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
              {parseFloat(item?.avg_rating).toFixed(1) } ({item?.total_rating})
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
          {item.location}
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
            INR {parseInt(item?.onward_amount)} Onwards
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
