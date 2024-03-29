import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import IconButton from "../../commonComponents/IconButton";
import VenuesCard from "../../commonComponents/VenuesCard";
import { VenuesData } from "../../DummyData/Data";
import Carousel from "react-native-banner-carousel";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import BasicCard from "../../commonComponents/BasicCard";
import { BOLD, FontSize, SEMIBOLD } from "../../constants/Fonts";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_ALL_VENUES } from "../../constants/ApiUrl";
import LoadingView from "../../commonComponents/LoadingView";

const BookTab = () => {
  const toast = useToast();
  const userReduxData = useSelector((state) => state.userRedux);

  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);
  const [allVenues, setAllVenues] = useState([])

  useEffect(() => {
    Api_GetAllVenue(true)
  },[])

  const Api_GetAllVenue = (isLoad) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("page", "1");
    formData.append("limit", "10");
    formData.append("latitude", userReduxData.lat);
    formData.append("longitude", userReduxData.long);

    formData.append("favourites", "0");
    formData.append("keyword", "");

    ApiManager.post(GET_ALL_VENUES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetAllVenue : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
    
          setAllVenues([...allVenues,...response.data.data.near_by_venues])
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_GetAllVenue Error ", err);
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
          >
            <MapPinIcon />
            <Text
              style={[
                CommonStyle.regularText,
                { color: white, marginLeft: pixelSizeHorizontal(5) },
              ]}
            >
              Ahmedabad
            </Text>
            <Icon name={"chevron-down"} size={24} color={white} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              additionalStyle={{ marginRight: pixelSizeHorizontal(18) }}
              onPress={() => {}}
            >
              <ChatIcon />
            </IconButton>
            <IconButton onPress={() => {}}>
              <BellIcon />
            </IconButton>
            {userData && (
              <IconButton
                additionalStyle={{ marginLeft: pixelSizeHorizontal(18) }}
                onPress={() => {}}
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
        <View
          style={{
            flex: 1,
            marginBottom: pixelSizeHorizontal(80),
            marginHorizontal: pixelSizeHorizontal(20),
          }}
        >
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
                console.log("index ::::::", index);
                // setPageIndex(index)
              }}
            >
              {[1, 1, 1].map((image, index) => {
                return (
                  <View
                    style={{
                      width: widthPixel(SCREEN_WIDTH - 30),
                      height: widthPixel(180),
                      borderRadius: widthPixel(10),
                    }}
                  >
                    <FastImage
                      style={{ flex: 1, borderRadius: widthPixel(10) }}
                      source={{
                        uri: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
                      }}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </Carousel>
          </View>

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
            <IconButton additionalStyle={{}} onPress={() => {}}>
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
            <View
              style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
            >
              <Text style={styles.cardTitle}>Vista Sports Arena</Text>
              <Text
                style={[
                  styles.cardDescription,
                  { marginTop: pixelSizeHorizontal(4) },
                ]}
              >
                Last Played on 08 November, 2023
              </Text>
            </View>
            <View style={styles.bookContainer}>
              <Text style={[styles.text, { color: white }]}>Book</Text>
            </View>
          </View>

          <FlatList
            data={allVenues}
            ListHeaderComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            ListFooterComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            renderItem={({ item }) => (
              <VenuesCard item={item} styles={{ flex: 1 }} />
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
