import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  black,
  black05,
  dim_grey,
  light_grey,
  primary,
  primary_light,
  secondary,
  secondary_dark_grey,
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
  widthPixel,
  pixelSizeVertical,
} from "../../commonComponents/ResponsiveScreen";
import { navigate } from "../../navigations/RootNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Input, useToast } from "native-base";
import FastImage from "react-native-fast-image";
import { GOOGLE_API_KEY, SCREEN_WIDTH } from "../../constants/ConstantKey";
import CarouselCard from "../../commonComponents/Carousel/index";
import HeaderView from "../../commonComponents/HeaderView";
import { ic_gift, ic_group, ic_team } from "../../constants/Images";
import BasicCard from "../../commonComponents/BasicCard";
import { VenuesData, HomeBanner } from "../../DummyData/Data";
import Divider from "../../commonComponents/Divider";
import GamesCard from "../../commonComponents/GamesCard";
import VenuesCard from "../../commonComponents/VenuesCard";
import Carousel from "react-native-banner-carousel";
import IconButton from "../../commonComponents/IconButton";
import ChatIcon from "../../assets/images/ChatIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCurrentLocation,
  user_data,
} from "../../redux/reducers/userReducer";
import BellIcon from "../../assets/images/BellIcon";
import GroupIcon from "../../assets/images/GroupIcon";
import PlayersIcon from "../../assets/images/PlayersIcon";
import GiftBoxIcon from "../../assets/images/GiftBoxIcon";
import MapPinIcon from "../../assets/images/MapPinIcon";
import CommonStyle from "../../commonComponents/CommonStyle";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_ALL_VENUES, GET_HOME } from "../../constants/ApiUrl";
import LoadingView from "../../commonComponents/LoadingView";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  //  const userData = (state) => state.userRedux.user_data
  const userData = useSelector((state) => state.userRedux.user_data);

  const userReduxData = useSelector((state) => state.userRedux);

  // const userData = useSelector(user_data);
  const [isLoading, setIsLoading] = useState(false);

  const [CurrentLatitude, setCurrentLatitude] = useState(null);
  const [CurrentLongitude, setCurrentLongitude] = useState(null);

  const [homeData, setHomeData] = useState(null);

  const [txtCity, setTxtCity] = useState("");

  useEffect(() => {
    //
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const focusListener = navigation?.addListener("tabPress", () => {
      console.log("screen call");
    });

    return focusListener;
  }, [navigation]);

  const getaddressFromLatLong = async (lat, long) => {
    Geocoder.from(lat, long)
      .then((json) => {
        var addressComponent = json.results?.[0];
        console.log("address comp : ", JSON.stringify(addressComponent));
        if (addressComponent) {
          var filtered_data = addressComponent?.address_components?.filter(
            (address) =>
              address?.types.includes("locality") ||
              address?.types.includes("administrative_area_level_3")
          );
          console.log("filtered address data : ", filtered_data);
          setTxtCity(filtered_data?.[0]?.long_name);
        }
      })
      .catch((error) => console.warn("Geocoder error", error));

  };

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          console.log("====================================");
          console.log("Permission Granted");
          console.log("====================================");
        } else {
          console.log("====================================");
          console.log("Permission Denied");
          console.log("====================================");
        }
      } catch (err) {
        // Api_GetContacts(true);
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // console.log('====================================');
        // console.log('Current Location is : ' + JSON.stringify(position));
        // console.log('====================================');

        dispatch(
          storeCurrentLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        );
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);

        getaddressFromLatLong(
          position.coords.latitude,
          position.coords.longitude
        );
        Api_Home(true, {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        console.log("userReduxData : ", userReduxData);
      },
      (error) => {
        console.log("Geolocation error : ", error.message);
      },
      {
        // enableHighAccuracy: false,
        timeout: 200000,
        // maximumAge: 3600000,
      }
    );
  };

  const Api_Home = (isLoad, locationCords) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("latitude", locationCords.lat);
    formData.append("longitude", locationCords.long);

    ApiManager.post(GET_HOME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Home : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setHomeData(response.data.data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Home Error ", err);
      });
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title=""
        isBack={false}
        titleColor={white}
        leftComponent={
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              navigate("LocationGoggle", {
                title: "Search City",
                googlePlaceProps: {
                  filterReverseGeocodingByTypes: [
                    "locality",
                    "administrative_area_level_3",
                  ],
                },
                onSelectPlace: (place_detail) => {
                  console.log("place_detail : ", place_detail);
                  setTxtCity(place_detail?.name);

                  dispatch(
                    storeCurrentLocation({
                      lat: place_detail?.geometry?.location?.lat,
                      long: place_detail?.geometry?.location?.lng,
                    })
                  );
                  setCurrentLatitude(place_detail?.geometry?.location?.lat);
                  setCurrentLongitude(place_detail?.geometry?.location?.lng);

                  Api_Home(true, {
                    lat: place_detail?.geometry?.location?.lat,
                    long: place_detail?.geometry?.location?.lng,
                  });
                },
              })
            }
          >
            <MapPinIcon />
            <Text
              style={[
                CommonStyle.regularText,
                { color: white, marginLeft: pixelSizeHorizontal(5) },
              ]}
            >
              {txtCity}
            </Text>
            <Icon name={"chevron-down"} size={24} color={white} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <IconButton
              additionalStyle={{ marginRight: pixelSizeHorizontal(18) }}
              onPress={() => {}}
            >
              <ChatIcon />
            </IconButton> */}
            <IconButton onPress={() => {}}>
              <BellIcon />
            </IconButton>
            {userData && (
              <IconButton
                additionalStyle={{ marginLeft: pixelSizeHorizontal(18) }}
                onPress={() => {
                  navigate("Profile");
                }}
              >
                <FastImage
                  source={{ uri: userData?.asset_url + userData?.profile }}
                  style={{
                    width: widthPixel(40),
                    height: widthPixel(40),
                    borderRadius: widthPixel(20),
                    borderWidth: 1,
                    borderColor: white,
                  }}
                />
              </IconButton>
            )}
          </View>
        }
      >
        <View style={{ flex: 1, marginBottom: pixelSizeHorizontal(80) }}>
          <View style={{ marginTop: pixelSizeHorizontal(20) }}>
            <Carousel
              autoplay={__DEV__ ? false : true}
              // ref={scrollRef}
              // autoplayTimeout={5000}
              loop={__DEV__ ? false : true}
              index={0}
              pageSize={SCREEN_WIDTH}
              pageIndicatorOffset={16}
              pageIndicatorStyle={{ backgroundColor: white }}
              activePageIndicatorStyle={{ backgroundColor: black }}
              // showsPageIndicator={venueImage.length ==1 ? false : true}
              onPageChanged={(index) => {
                // setPageIndex(index)
              }}
            >
              {homeData?.sliders.map((item, index) => {
                return (
                  <View
                    style={{
                      width: widthPixel(SCREEN_WIDTH - 30),
                      height: widthPixel(180),
                      alignSelf: "center",
                      borderRadius: widthPixel(10),
                    }}
                  >
                    <FastImage
                      style={{ flex: 1, borderRadius: widthPixel(10) }}
                      source={{
                        uri: userData.asset_url + item.file,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </Carousel>
            {/* <CarouselCard
              height={180}
              interval={4000}
              data={HomeBanner}
              onPress={(item) => {}}
              contentRender={(item) => (
                <View style={{ borderRadius: widthPixel(10) }}>
                  <Image
                    style={{
                      borderRadius: widthPixel(8),
                      width: "100%",
                      height: "100%",
                      borderRadius: widthPixel(10),
                    }}
                    source={{
                      uri: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
                    }}
                  />
                </View>
              )}
            /> */}
          </View>

          {homeData?.near_by_games.length ? (
            <>
              <View style={styles.nearByContainer}>
                <Text style={styles.nearByText}>
                  {Translate.t("join_nearby_games")}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigate("Games");
                  }}
                >
                  <Icon name={"chevron-right"} size={28} color={black} />
                </TouchableOpacity>
              </View>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: pixelSizeHorizontal(20),
                  paddingHorizontal: pixelSizeHorizontal(20),
                }}
                horizontal
                data={homeData?.near_by_games}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{ width: widthPixel(20), height: heightPixel(20) }}
                  />
                )}
                renderItem={({ item }) => (
                  <GamesCard
                    cardStyles={{ width: SCREEN_WIDTH / 1.3 }}
                    item={item}
                    bookMark={false}
                  />
                )}
              />
            </>
          ) : null}

          {homeData?.near_by_venues.length ? (
            <>
              <View style={[styles.nearByContainer, { marginTop: 10 }]}>
                <Text style={styles.nearByText}>
                  {Translate.t("book_nearby_venue")}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigate("Book");
                  }}
                >
                  <Icon name={"chevron-right"} size={28} color={black} />
                </TouchableOpacity>
              </View>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: pixelSizeHorizontal(20),
                  paddingHorizontal: pixelSizeHorizontal(20),
                }}
                horizontal
                data={homeData?.near_by_venues}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{ width: widthPixel(20), height: widthPixel(20) }}
                  />
                )}
                renderItem={({ item }) => (
                  <VenuesCard
                    item={item}
                    styles={{ width: SCREEN_WIDTH / 1.4 }}
                    isShowFavourite={false}
                    showGamesList={false}
                  />
                )}
              />
            </>
          ) : null}

          <View
            style={{
              paddingHorizontal: pixelSizeHorizontal(20),
              marginTop: pixelSizeHorizontal(10),
            }}
          >
            <BasicCard style={styles.cardContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: pixelSizeHorizontal(10),
                  }}
                >
                  <GroupIcon />
                  <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                    <Text style={styles.semiText}>Groups</Text>
                    <Text
                      style={[
                        styles.semiSubText,
                        { marginTop: pixelSizeHorizontal(4) },
                      ]}
                    >
                      Let's connect and Play
                    </Text>
                  </View>
                </View>
                <Icon name={"chevron-right"} size={28} color={dim_grey} />
              </View>
              <Divider style={{ marginVertical: pixelSizeVertical(10) }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: pixelSizeHorizontal(10),
                  }}
                >
                  <PlayersIcon />
                  <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                    <Text style={styles.semiText}>Manage Player</Text>
                    <Text
                      style={[
                        styles.semiSubText,
                        { marginTop: pixelSizeHorizontal(4) },
                      ]}
                    >
                      Manage your Players
                    </Text>
                  </View>
                </View>
                <Icon name={"chevron-right"} size={28} color={dim_grey} />
              </View>
            </BasicCard>
          </View>

          <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
            <BasicCard style={styles.cardContainer} onPress={()=> navigate("InvitePeople")}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: pixelSizeHorizontal(10),
                }}
              >
                <GiftBoxIcon />
                <View style={{ marginHorizontal: 15 }}>
                  <Text style={styles.semiText}>Refer a Sport Lover</Text>
                  <Text
                    style={[
                      styles.semiSubText,
                      { marginTop: pixelSizeHorizontal(4) },
                    ]}
                  >
                    Refer & Earn a Coupon
                  </Text>
                </View>
              </View>
            </BasicCard>
          </View>
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
  },
  nearByContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: pixelSizeHorizontal(20),
    marginBottom: 10,
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  nearByText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_16,
    color: black,
  },
  subIcon: {
    width: widthPixel(28),
    height: widthPixel(28),
  },
  semiText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_14,
    color: black,
  },
  semiSubText: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: dim_grey,
  },
  cardContainer: {
    borderWidth: 0,
    marginBottom: 10,
    shadowColor: black05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default Home;
