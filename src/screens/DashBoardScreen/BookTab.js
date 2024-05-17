import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import CommonStyle from "../../commonComponents/CommonStyle";
import { black, dim_grey, secondary, white } from "../../constants/Color";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import MapPinIcon from "../../assets/images/MapPinIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "native-base";
import ChatIcon from "../../assets/images/ChatIcon";
import BellIcon from "../../assets/images/BellIcon";
import { storeCurrentLocation, user_data } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../commonComponents/IconButton";
import VenuesCard from "../../commonComponents/VenuesCard";
import { VenuesData } from "../../DummyData/Data";
import Carousel from "react-native-banner-carousel";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import BasicCard from "../../commonComponents/BasicCard";
import { BOLD, FontSize, SEMIBOLD } from "../../constants/Fonts";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_ALL_VENUES, RECENT_BOOK, VENUE_FAVORITE } from "../../constants/ApiUrl";
import LoadingView from "../../commonComponents/LoadingView";
import { getUniqueListBy } from "../../commonComponents/Utils";
import { navigate } from "../../navigations/RootNavigation";
import Geocoder from "react-native-geocoding";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

const BookTab = (props) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const dispatch = useDispatch()
  const userReduxData = useSelector((state) => state.userRedux);

  const userData = useSelector(user_data);
  const [isRefresh, setIsRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [txtCity, setTxtCity] = useState("");

  const [page, setPage] = useState(1);
  const [allVenues, setAllVenues] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [favourites, setFavourites] = useState(0);

  const [recentPlay, setRecentPlay] = useState(null);

  const [CurrentLatitude, setCurrentLatitude] = useState(userReduxData.lat || 0.0);
  const [CurrentLongitude, setCurrentLongitude] = useState(userReduxData.long || 0.0);

  useEffect(() => {
    getaddressFromLatLong(CurrentLatitude,CurrentLongitude )
  },[])

  useEffect(() => {
    console.log("effecr call");

    Api_GetAllVenue(true, {
      lat: CurrentLatitude,
      long: CurrentLongitude,
    });
   
  }, [page, favourites , isFocused]);

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

  const Api_GetAllVenue = (isLoad, locationCords) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    // formData.append("latitude", locationCords.lat);
    // formData.append("longitude", locationCords.long);

    // formData.append("favourites", favourites);
    // formData.append("keyword", "");

    ApiManager.post(RECENT_BOOK, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetAllVenue : ", JSON.stringify(response));
        setIsLoading(false);
        setIsRefresh(false)
        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allVenues,
              ...response.data.data.recent_booked_venues,
            ];

            setRecentPlay(response.data.data.last_played_record);
            setAllVenues(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allVenues,
              ...response.data.data.recent_booked_venues,
            ];
            setAllVenues(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsRefresh(false)

        console.error("Api_GetAllVenue Error ", err);
      });
  };

  const Api_Favorite_Venue = (isLoad, item) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("venue_id", item.id);

    ApiManager.post(VENUE_FAVORITE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Favorite_Venue : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          // Api_GetAllVenue(true);

          if (favourites) {
            let newData = allVenues.filter(function (data) {
              return data.id != item.id;
            });
            setAllVenues(newData);
          } else {
            let newData = allVenues.map((el) =>
              el.id == item.id
                ? { ...el, is_favourites: !el?.is_favourites }
                : el
            );
            setAllVenues(newData);
          }

          toast.show({
            description: response.data.message,
          });
        } else {
          // toast.show({
          //   description: response.data.message,
          // });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Favorite_Venue Error ", err);
      });
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title=""
        isBack={false}
        isRefreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true)
          Api_GetAllVenue(true, {
            lat: CurrentLatitude,
            long: CurrentLongitude,
          });
         }}
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

                Api_GetAllVenue(true, {
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
                onPress={() => navigate("Profile")}
              >
                <Image
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
        <View
          style={{
            flex: 1,
            marginBottom: pixelSizeHorizontal(80),
            marginHorizontal: pixelSizeHorizontal(20),
          }}
        >


          {recentPlay ?
          <View
            style={[
              CommonStyle.shadow,
              {
                marginTop: pixelSizeHorizontal(16),
                flexDirection: "row",
                alignItems: "center",
                padding: pixelSizeHorizontal(18),
                borderRadius: widthPixel(10),
                backgroundColor: white,
              },
            ]}
          >
            {/* <IconButton additionalStyle={{}} onPress={() => {}}> */}
              <Image
                source={{ uri: userData?.asset_url + userData?.profile }}
                style={{
                  width: widthPixel(40),
                  height: widthPixel(40),
                  borderRadius: widthPixel(20),
                  borderWidth: 1,
                  borderColor: white,
                }}
              />
            {/* </IconButton> */}
            <View
              style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
            >
              <Text style={styles.cardTitle}>{recentPlay?.title}</Text>
              <Text
                style={[
                  styles.cardDescription,
                  { marginTop: pixelSizeHorizontal(4) },
                ]}
              >
                Last Played on{' '}
                {moment(recentPlay?.transactions?.created_at).format("DD MMM, YYYY")}
              </Text>
            </View>
            <TouchableOpacity style={styles.bookContainer}
            onPress={() => navigate("VenueDetail", { venueData: recentPlay })}>
              <Text style={[styles.text, { color: white }]}>Book Now</Text>
            </TouchableOpacity>
          </View> : null}

          <Text
            style={[
              CommonStyle.titleText,
              { fontSize: FontSize.FS_18, marginTop: pixelSizeHorizontal(20) },
            ]}
          >
            Recently Booked
          </Text>


          {/* <View style={{ flexWrap: "wrap" }}>
            <TouchableOpacity
              style={{
                backgroundColor: favourites && secondary,
                borderWidth: 1,
                borderColor: favourites == 0 ? dim_grey : secondary,
                marginTop: pixelSizeHorizontal(20),
                borderRadius: pixelSizeHorizontal(5),
                paddingHorizontal: pixelSizeHorizontal(12),
                paddingVertical: pixelSizeHorizontal(8),
              }}
              onPress={() => {
                setFavourites(favourites == 0 ? 1 : 0);
                setPage(1);
                setAllVenues([]);
              }}
            >
              <Text
                style={[styles.text, { color: favourites ? white : dim_grey }]}
              >
                Favourites
              </Text>
            </TouchableOpacity>
          </View> */}

          <FlatList
            data={allVenues}
            extraData={props}
            ListHeaderComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            ListFooterComponent={() =>
              showMore ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: pixelSizeHorizontal(20),
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => setPage(page + 1)}
                  >
                    <Text style={[styles.text, { color: secondary }]}>
                      Show more
                    </Text>
                    <Icon name={"arrow-down"} size={20} color={secondary} />
                  </TouchableOpacity>
                </View>
              ) :  <View style={{ height: widthPixel(12) }} />
            }
            ItemSeparatorComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: pixelSizeHorizontal(30),
                }}
              >
                <Text style={[styles.text, { color: dim_grey }]}>
                  No record found
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View style={{marginHorizontal : pixelSizeHorizontal(5)}}>
              <VenuesCard
                item={item}
                styles={{ flex: 1 }}
                btnFavouriteTap={() => {
                  console.log("favorite");
                  Api_Favorite_Venue(true, item);
                }}
              />
              </View>
            )}
          />
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_14,
    color: black,
  },
  cardDescription: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_10,
    color: dim_grey,
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
    fontSize: FontSize.FS_13,
  },
});

export default BookTab;
