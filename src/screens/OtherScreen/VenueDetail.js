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
import React, { useState, useRef } from "react";
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderView from "../../commonComponents/HeaderView";
import Divider from "../../commonComponents/Divider";
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import StarRating from "react-native-star-rating";
import { VenuesData, PickSport, AmenitiesData } from "../../DummyData/Data";
import SportItem from "../../commonComponents/SportItem";
import { Colors } from "../../constants/CustomeColor";
import { clock, ic_navigation } from "../../constants/Images";
import RBSheet from "react-native-raw-bottom-sheet";
import RatingSheet from "../../commonComponents/sheets/Rating-sheet";

const VenueDetail = ({ route }) => {
  const refRBSheet = React.createRef();

  const [venueData, setVenueData] = useState(route?.params?.item);
  console.log("route: " + JSON.stringify(route.params.item));

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const openRatingSheet = () => {
    refRBSheet.current.open();
  };

  const onPressRate = () => {
    refRBSheet.current.close();
    setRating(0);
    setReview("");
    console.log("rating", rating, review);
  };

  const onRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onReviewChange = (newReview) => {
    setReview(newReview);
  };

  return (
    <>
      <HeaderView
        title={venueData.venueName}
        HeaderSmall={true}
        onPress={() => goBack()}
        isBack={true}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
        titleColor={Colors.white}
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                name={"heart-outline"}
                size={26}
                color={Colors.lightGrey}
                style={{ marginHorizontal: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name={"share-variant-outline"}
                size={26}
                color={Colors.lightGrey}
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
            marginVertical: pixelSizeVertical(10),
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_16,
              color: Colors.black,
               marginVertical: pixelSizeVertical(10),
            }}
          >
            {venueData.venueName}
          </Text>
        </View>

        <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
          <View style={styles.infoContainer}>
            <FastImage
              style={{
                width: 22,
                height: 22,
              }}
              source={clock}
              resizeMode="cover"
            />

            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_14,
                color: Colors.black,
              }}
            >
              7:30Am to 9:00am
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 5,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: pixelSizeVertical(10),
            }}
          >
            <FastImage
              style={{
                width: 22,
                height: 22,
              }}
              source={ic_navigation}
              resizeMode="cover"
            />
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_13,
                color: Colors.black05,
                marginLeft: 5,
                flex: 1,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur , Lorem ipsum dolor sit
              amet, consectetur
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.google.com/maps/place/Ahmedabad,+Gujarat/@23.0204978,72.4396539,11z/data=!3m1!4b1!4m6!3m5!1s0x395e848aba5bd449:0x4fcedd11614f6516!8m2!3d23.022505!4d72.5713621!16zL20vMDFkODhj"
            )
          }
          style={styles.locationContainer}
        >
          <Icon
            name={"map-marker-radius-outline"}
            size={22}
            color={Colors.black}
          />
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_14,
              color: Colors.black05,
            }}
          >
            Show in Map
          </Text>
        </TouchableOpacity>

        <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
          <Divider style={{ marginVertical: pixelSizeVertical(10) }} />
        </View>

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
              fullStarColor={Colors.warning}
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
                color: Colors.secondaryDarkGrey,
                marginLeft: 5,
              }}
            >
              4.0
            </Text>
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_10,
                color: Colors.secondaryDarkGrey,
                marginLeft: 2,
              }}
            >
              (10k)
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
              onPress={openRatingSheet}
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

        <RBSheet
          ref={refRBSheet}
          height={300}
          closeOnDragDown={true}
          customStyles={{
            container: {
              borderTopLeftRadius: widthPixel(30),
              borderTopRightRadius: widthPixel(30),
            },
          }}
        >
          <RatingSheet
            onRatingChange={onRatingChange}
            onReviewChange={onReviewChange}
            onPressRate={onPressRate}
            rating={rating}
          />
        </RBSheet>

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
                color: Colors.black,
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
                Upcoming
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
              color: Colors.black,
            }}
          >
            Avialable Sports
          </Text>
        </View>
        <FlatList
          style={{ marginHorizontal: pixelSizeHorizontal(20) }}
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
              color: Colors.black,
            }}
          >
            Amenities
          </Text>
        </View>
        <FlatList
          style={{ marginHorizontal: pixelSizeHorizontal(14) }}
          data={AmenitiesData}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: Colors.primaryLight, borderWidth: 0 },
              ]}
            >
              <Text
                style={{
                  fontFamily: MEDIUM,
                  fontSize: FontSize.FS_13,
                  color: Colors.primary,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ paddingHorizontal: pixelSizeHorizontal(40) }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.secondary,
              borderWidth: 0,
              marginRight: pixelSizeHorizontal(15),
              borderRadius: widthPixel(30),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
              padding: pixelSizeHorizontal(15),
            }}
          >
            <Text
              style={{
                fontFamily: BOLD,
                fontSize: FontSize.FS_15,
                color: Colors.white,
              }}
            >
              Create Game
            </Text>
          </TouchableOpacity>
        </View>

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
              color: Colors.black,
            }}
          >
            About Venues
          </Text>
        </View>
        <View style={{ marginHorizontal: pixelSizeHorizontal(20) }}>
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_13,
              color: Colors.black,
              marginBottom: 8,
            }}
          >
            A cricket field is a large grass field on which the game of cricket
            is played. Although generally oval in shape, there is a wide variety
            within this: some are almost perfect circles, some elongated{" "}
          </Text>
        </View>
      </HeaderView>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: pixelSizeHorizontal(20),
        }}
      >
        <TouchableOpacity
          onPress={() => handleBulkCorporate()}
          style={[styles.btnLogin, { marginRight: pixelSizeHorizontal(30) }]}
        >
          <Text style={styles.signInText}>Bulk/Corporate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate("SelectSlot")}
          style={styles.btnLogin}
        >
          <Text style={styles.signInText}>BOOK NOW</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    width: 180,
    height: 30,
    justifyContent: "space-evenly",
    paddingVertical: 5,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  locationContainer: {
    paddingVertical: 5,
    marginVertical: pixelSizeVertical(10),
    width: 120,
    marginHorizontal: pixelSizeHorizontal(20),
    borderRadius: widthPixel(6),
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-evenly",
  },
  btnLogin: {
    flex: 1,
    borderRadius: widthPixel(25),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: Colors.black,
    padding: 10,
  },
  signInText: {
    fontSize: FontSize.FS_16,
    color: Colors.white,
    fontFamily: MEDIUM,
  },
  btn: {
    width: 100,
    height: 30,
    borderWidth: 0.5,
    marginRight: 15,
    borderRadius: widthPixel(5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: pixelSizeVertical(10),
  },
});

export default VenueDetail;
