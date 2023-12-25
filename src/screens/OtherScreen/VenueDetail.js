import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import React, { useState } from "react";
import {
  black,
  black05,
  grey,
  light_grey,
  primary,
  secondary,
  secondary_dark_grey,
  warmGrey,
  warning,
  white,
} from "../../constants/Color";

import Translate from "../../translation/Translate";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import IconButton from "../../commonComponents/IconButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderView from "../../commonComponents/HeaderView";
import { Divider, Input } from "native-base";
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import StarRating from "react-native-star-rating";
import { VenuesData, PickSport } from "../../DummyData/Data";
import SportItem from "../../commonComponents/SportItem";
import { Colors } from "../../constants/CustomeColor";

const VenueDetail = ({ route }) => {
  const [venueData, setVenueData] = useState(route?.params?.item);
  console.log("route: " + JSON.stringify(route.params.item));

  const AmenitiesData = [
    {
      id: 1,
      name: "Flood lights",
    },
    {
      id: 2,
      name: "Cafe",
    },
    {
      id: 3,
      name: "Washroom",
    },
    {
      id: 4,
      name: "Parking",
    },
    {
      id: 5,
      name: "Drinking water",
    },
    {
      id: 6,
      name: "Grass pitch",
    },
    {
      id: 7,
      name: "Indoor/Outdoor",
    },
    {
      id: 8,
      name: "Capacity-50",
    },
  ];
  return (
    <>
      <HeaderView
        title={venueData.venueName}
        onPress={() => goBack()}
        isBack={true}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
        titleColor={white}
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                name={"heart-outline"}
                size={26}
                color={light_grey}
                style={{ marginHorizontal: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name={"share-variant-outline"}
                size={26}
                color={light_grey}
              />
            </TouchableOpacity>
          </View>
        }
      >
        <FlatList
          data={VenuesData}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ width: SCREEN_WIDTH, height: widthPixel(220) }}>
              <FastImage style={{ flex: 1 }} source={{ uri: item.image }} />
            </View>
          )}
        />
        <View
          style={{
            marginHorizontal: pixelSizeHorizontal(20),
            marginVertical: 10,
            borderBottomWidth: 2,
            paddingBottom: pixelSizeHorizontal(10),
            borderBottomColor: secondary,
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_16,
              color: black,
            }}
          >
            {venueData.venueName}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: pixelSizeHorizontal(20),
            flexDirection: "row",
            alignItems: "center",
            marginVertical: pixelSizeHorizontal(5),
          }}
        >
          <Icon name={"map-marker-radius-outline"} size={22} color={primary} />
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_15,
              color: secondary_dark_grey,
            }}
          >
            Kankaria Football Ground (Maninagar)
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.google.com/maps/place/Ahmedabad,+Gujarat/@23.0204978,72.4396539,11z/data=!3m1!4b1!4m6!3m5!1s0x395e848aba5bd449:0x4fcedd11614f6516!8m2!3d23.022505!4d72.5713621!16zL20vMDFkODhj"
            )
          }
          style={{
            paddingVertical: 5,
            marginVertical: 10,
            backgroundColor: primary,
            width: 100,
            marginHorizontal: pixelSizeHorizontal(20),
            borderRadius: 6,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_14,
              color: white,
            }}
          >
            Show in map
          </Text>
        </TouchableOpacity>

        <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
          <Divider style={{ marginVertical: pixelSizeVertical(10) }} />
        </View>

        {/* <View
          style={{
            paddingHorizontal: pixelSizeHorizontal(20),
            flexDirection: "row",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StarRating
                fullStarColor={warning}
                disabled={false}
                maxStars={5}
                rating={4}
                starSize={16}
                containerStyle={{ width: 100 }}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_15,
                  color: secondary_dark_grey,
                  marginLeft: 5,
                }}
              >
                4.0
              </Text>
            </View>
            <Text>Hello</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: Colors.secondary,
                },
              ]}
            >
              <Text
                style={{
                  color: Colors.white,
                }}
              >
                Rates
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: Colors.secondary,
                },
              ]}
            >
              <Text
                style={{
                  color: Colors.white,
                }}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View
          style={{
            paddingHorizontal: pixelSizeHorizontal(20),
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <StarRating
              fullStarColor={warning}
              disabled={false}
              maxStars={5}
              rating={4}
              starSize={16}
              containerStyle={{ width: 100 }}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_15,
                color: secondary_dark_grey,
                marginLeft: 5,
              }}
            >
              4.0
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: Colors.secondary,
                },
              ]}
            >
              <Text
                style={{
                  color: Colors.white,
                }}
              >
                Rates
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: pixelSizeHorizontal(20),
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_15,
                color: secondary_dark_grey,
              }}
            >
              200 Total games
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: Colors.secondary,
                },
              ]}
            >
              <Text
                style={{
                  color: Colors.white,
                }}
              >
                Rates
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
          <Divider style={{ marginVertical: pixelSizeVertical(10) }} />
        </View>

        <View
          style={{
            paddingHorizontal: pixelSizeHorizontal(20),
            flexDirection: "row",
            alignItems: "center",
            marginVertical: pixelSizeHorizontal(10),
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_18,
              color: black,
            }}
          >
            Avialable Sports
          </Text>
        </View>
        <FlatList
          style={{ marginHorizontal: pixelSizeHorizontal(14) }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={PickSport}
          contentContainerStyle={{
            flexDirection: "row",
          }}
          renderItem={({ item }) => <SportItem item={item} isDisabled={true} />}
        />

        <View
          style={{
            marginHorizontal: pixelSizeHorizontal(20),
            flexDirection: "row",
            alignItems: "center",
            marginVertical: pixelSizeHorizontal(10),
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_18,
              color: black,
            }}
          >
            Amenities/Facalities
          </Text>
        </View>
        <FlatList
          style={{ marginHorizontal: pixelSizeHorizontal(14) }}
          data={AmenitiesData}
          contentContainerStyle={{
            flexDirection: "row",
            alignSelf: "flex-start",
            flexWrap: "wrap",
          }}
          renderItem={({ item }) => (
            <View style={{ padding: 6 }}>
              <Text
                style={{
                  fontFamily: REGULAR,
                  fontSize: FontSize.FS_14,
                  color: black,
                  marginLeft: 5,
                }}
              >
                • {item.name}
              </Text>
            </View>
          )}
        />

        <View
          style={{
            marginHorizontal: pixelSizeHorizontal(20),
            flexDirection: "row",
            alignItems: "center",
            marginVertical: pixelSizeHorizontal(10),
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_18,
              color: black,
            }}
          >
            About the vanues :
          </Text>
        </View>
        <View style={{ marginHorizontal: pixelSizeHorizontal(20) }}>
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_14,
              color: black,
              marginBottom: 8,
            }}
          >
            A cricket field is a large grass field on which the game of cricket
            is played. Although generally oval in shape, there is a wide variety
            within this: some are almost perfect circles, some elongated{" "}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => resetScreen("Dashboard")}
          style={styles.btnLogin}
        >
          <Text style={styles.signInText}>BOOK NOW</Text>
        </TouchableOpacity>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
  },
  btnLogin: {
    backgroundColor: primary,
    borderRadius: widthPixel(5),
    padding: pixelSizeHorizontal(10),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: pixelSizeHorizontal(20),
    marginHorizontal: pixelSizeHorizontal(20),
  },
  signInText: {
    fontSize: FontSize.FS_16,
    color: white,
    fontFamily: MEDIUM,
  },
  btn: {
    width: 100,
    height: 30,
    borderWidth: 0.5,
    marginRight: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default VenueDetail;
