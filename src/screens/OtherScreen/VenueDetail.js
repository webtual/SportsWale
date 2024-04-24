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
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
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
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import StarRating from "react-native-star-rating";
import { VenuesData, PickSport, AmenitiesData } from "../../DummyData/Data";
import SportItem from "../../commonComponents/SportItem";
import { Colors } from "../../constants/CustomeColor";
import { clock, ic_navigation } from "../../constants/Images";
import RBSheet from "react-native-raw-bottom-sheet";
import RatingSheet from "../../commonComponents/sheets/Rating-sheet";
import ApiManager from "../../commonComponents/ApiManager";
import { RATE_VENUE, VENUES_DETAIL } from "../../constants/ApiUrl";
import { useToast } from "native-base";
import LoadingView from "../../commonComponents/LoadingView";
import {
  black,
  dim_grey,
  grey,
  primary,
  primary_light,
  secondary,
  white,
  yellow,
} from "../../constants/Color";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import IconButton from "../../commonComponents/IconButton";
import moment from "moment";
import ClockIcon from "../../assets/images/ClockIcon";
import LocationIcon from "../../assets/images/LocationIcon";
import NavigationIcon from "../../assets/images/NavigationIcon";
import GoogleMapPinIcon from "../../assets/images/GoogleMapPinIcon";
import { BottomModal } from "../../commonComponents/Popup";

const VenueDetail = (props) => {
  const toast = useToast();

  const { venueData } = props?.route?.params;
  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenRating, setIsOpenRating] = useState(false);

  const [venueDetail, setVenueDetail] = useState(null);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    Api_Get_Venue_Details(true);
  }, []);

  const Api_Get_Venue_Details = (isLoad) => {
    setIsLoading(isLoad);
    ApiManager.get(VENUES_DETAIL + venueData?.id, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Venue_Details : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setVenueDetail(response.data.data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Venue_Details Error ", err);
      });
  };

  const Api_Rate_Venue = (isLoad, rateData) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("venue_id", venueData?.id);
    formData.append("description", rateData?.description);
    formData.append("rating", rateData?.rating);

    ApiManager.post(RATE_VENUE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Rate_Venue : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setRating(0);
          setReview("");
          toast.show({
            description: response.data.message,
          });
          setIsOpenRating(false);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Rate_Venue Error ", err);
      });
  };

  const openRatingSheet = () => {
    setIsOpenRating(true);
  };

  const onPressRate = () => {
    console.log("rating", rating, review);
    Api_Rate_Venue(true, { description: review, rating: rating });
  };

  const onRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onReviewChange = (newReview) => {
    setReview(newReview);
  };

  const btnCreateGameTap = () => {
    if (venueDetail?.venue_grounds.length) {
      navigate("VenueSlotBooking", { venueDetail: venueDetail });
    }else{
      toast.show({
        description : `${venueDetail?.title} doesn't have any ground linked, please try another venue`,
        style:{
          marginHorizontal:pixelSizeHorizontal(20)
        }
      })
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <FlatList
                data={[{ image: userData?.asset_url + venueDetail?.image }]}
                horizontal
                bounces={false}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: SCREEN_WIDTH, height: widthPixel(180) }}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={{ uri: item.image }}
                    />
                  </View>
                )}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: 20, left: 10 }}
              >
                <IconButton onPress={() => goBack()}>
                  <Icon name={"chevron-left"} size={32} color={white} />
                </IconButton>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: pixelSizeHorizontal(20),
                marginVertical: pixelSizeHorizontal(10),
              }}
            >
              <Text
                style={{
                  fontFamily: BOLD,
                  fontSize: FontSize.FS_16,
                  color: black,
                  marginVertical: pixelSizeHorizontal(10),
                }}
              >
                {venueDetail?.title}
              </Text>
            </View>

            <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
              <View style={styles.infoContainer}>
                <ClockIcon />

                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_14,
                    color: black,
                  }}
                >
                  {venueDetail?.display_start_time} to {venueDetail?.display_end_time}
                  {/* {moment(venueDetail?.start_time).format("HH:MM A")} to {moment(venueDetail?.end_time).format("HH:MM A")} */}
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 5,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: pixelSizeHorizontal(10),
                }}
              >
                <NavigationIcon
                  width={widthPixel(20)}
                  height={widthPixel(20)}
                />
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_13,
                    color: black,
                    marginLeft: 8,
                    flex: 1,
                  }}
                >
                  {venueDetail?.location}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(venueDetail?.map_url)}
              style={styles.locationContainer}
            >
              <GoogleMapPinIcon />
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_12,
                  color: dim_grey,
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
                  fullStarColor={yellow}
                  disabled={false}
                  maxStars={5}
                  rating={parseInt(venueDetail?.avg_rating)}
                  starSize={16}
                  containerStyle={{ width: 100 }}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_15,
                    color: black,
                    marginLeft: 15,
                    flex: 1,
                  }}
                >
                  {parseInt(venueDetail?.avg_rating)}{" "}
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_10,
                      color: black,
                    }}
                  >
                    ({venueDetail?.total_rating})
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 / 1.2, flexWrap: "wrap" }}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor: venueDetail?.allow_for_rating ? secondary: grey,
                    },
                  ]}
                  onPress={() => {
                    if(venueDetail?.allow_for_rating){
                      openRatingSheet()
                    }
                    }}
                >
                  <Text
                    style={{
                      color: white,
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_12,
                    }}
                  >
                    Rate Venue
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
                    fontSize: FontSize.FS_14,
                    color: black,
                  }}
                >
                  {venueDetail?.total_game_count} Total games
                </Text>
              </View>
              <View style={{ flex: 1 / 1.2, flexWrap: "wrap" }}>
                <View
                  style={[
                    styles.btn,
                    {
                      backgroundColor: Colors.secondary,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: white,
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_12,
                    }}
                  >
                    {venueDetail?.upcoming_game_count} Upcoming
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
              <Divider style={{ marginVertical: pixelSizeVertical(10) }} />
            </View>

            {venueDetail?.venue_games.length ? (
              <>
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
                      fontFamily: BOLD,
                      fontSize: FontSize.FS_16,
                      color: black,
                    }}
                  >
                    Avialable Sports
                  </Text>
                </View>
                <FlatList
                  style={{ marginHorizontal: pixelSizeHorizontal(20) }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={venueDetail?.venue_games}
                  contentContainerStyle={{
                    flexDirection: "row",
                  }}
                  renderItem={({ item }) => (
                    <SportItem item={item} isDisabled={true} />
                  )}
                />
              </>
            ) : null}

            {venueDetail?.venue_amenities.length ? (
              <>
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
                      fontFamily: BOLD,
                      fontSize: FontSize.FS_16,
                      color: black,
                    }}
                  >
                    Amenities
                  </Text>
                </View>
                <FlatList
                  style={{ marginHorizontal: pixelSizeHorizontal(14) }}
                  data={venueDetail?.venue_amenities}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.btn,
                        {
                          backgroundColor: primary_light,
                          borderWidth: 0,
                          marginRight: pixelSizeHorizontal(12),
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: SEMIBOLD,
                          fontSize: FontSize.FS_12,
                          color: primary,
                          textAlign: "center",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  )}
                />
              </>
            ) : null}

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
                  fontFamily: BOLD,
                  fontSize: FontSize.FS_16,
                  color: black,
                }}
              >
                About Venues
              </Text>
            </View>
            <View style={{ marginHorizontal: pixelSizeHorizontal(20) }}>
              <Text
                style={{
                  fontFamily: REGULAR,
                  fontSize: FontSize.FS_12,
                  color: black,
                  marginBottom: 8,
                }}
              >
                {venueDetail?.about}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingHorizontal: pixelSizeHorizontal(40),
          }}
        >
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
            onPress={() => btnCreateGameTap()}
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

        <BottomModal
          isVisible={isOpenRating}
          onClose={() => {
            setIsOpenRating(false);
            setRating(0);
            setReview("");
          }}
          title={venueDetail?.title}
        >
          <RatingSheet
            onRatingChange={onRatingChange}
            onReviewChange={onReviewChange}
            onPressRate={onPressRate}
            rating={rating}
            review={review}
            isLoading={isLoading}
          />
        </BottomModal>
        {isLoading && <LoadingView />}
      </SafeAreaView>
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
    borderColor: primary_light,
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
    borderColor: dim_grey,
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
    // minWidth: 100,
    // marginRight: 15,
    borderRadius: widthPixel(5),
    marginVertical: pixelSizeVertical(10),
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(12),
  },
});

export default VenueDetail;
