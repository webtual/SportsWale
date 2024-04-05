import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Colors } from "../constants/CustomeColor";
import FastImage from "react-native-fast-image";
import { venue } from "../constants/Images";
import { pixelSizeHorizontal, pixelSizeVertical } from "./ResponsiveScreen";
import { SCREEN_WIDTH } from "../constants/ConstantKey";
import { BOLD, FontSize, SEMIBOLD, MEDIUM } from "../constants/Fonts";
import Divider from "./Divider";
import { navigate } from "../navigations/RootNavigation";
import {
  black,
  black05,
  dim_grey,
  primary_light,
  secondary,
  white,
} from "../constants/Color";
import IconButton from "./IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import SportItem from "./SportItem";

export default function VenuesCard({
  item: VenueData,
  styles,
  showGamesList = true,
  isShowFavourite = true,
  ...props
}) {
  const userData = useSelector((state) => state.userRedux.user_data);

  return (
    <TouchableOpacity
      onPress={() => navigate("VenueDetail", { venueData: VenueData })}
      activeOpacity={0.7}
      style={[
        {
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
        { ...styles },
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
          source={{ uri: userData?.asset_url + VenueData?.image }}
          resizeMode="cover"
        />
        {isShowFavourite && (
          <IconButton
            additionalStyle={{ position: "absolute", bottom: 10, right: 10 }}
            onPress={() => {
              props?.btnFavouriteTap();
            }}
          >
            <Icon
              name={VenueData?.is_favourites ? "heart" : "heart-outline"}
              size={24}
              color={VenueData?.is_favourites ? secondary : white}
            />
          </IconButton>
        )}
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
              {VenueData.title}
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
              {parseFloat(VenueData?.avg_rating).toFixed(1)} (
              {VenueData?.total_rating})
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
          {VenueData.location}
        </Text>

        {VenueData?.venue_games.length && showGamesList ? (
          <FlatList
            style={{ marginTop: pixelSizeHorizontal(10) }}
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            data={VenueData?.venue_games}
            contentContainerStyle={{
              flexDirection: "row",
            }}
            renderItem={({ item }) => (
              <SportItem
                item={item}
                isDisabled={false}
                activeOpacity={1}
                onPressItem={() => {
                  navigate("VenueDetail", { venueData: VenueData });
                }}
              />
            )}
          />
        ) : null}

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
            INR {parseInt(VenueData?.onward_amount)} Onwards
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
