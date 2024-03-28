import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  black,
  black05,
  light_grey,
  primary,
  secondary_dark_grey,
  secondary_grey,
  white,
  secondary,
  warmGrey,
  warning,
} from "../../constants/Color";

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
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderView from "../../commonComponents/HeaderView";
import { FlatList } from "native-base";
import StarRating from "react-native-star-rating";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import CarouselCard from "../../commonComponents/Carousel/lib/Card";
import { GET_HOME_BANNER } from "../../constants/ApiUrl";
import CommonStyle from "../../commonComponents/CommonStyle";

const ActivityDetails = ({ route }) => {
  console.log("route", route?.prams?.item);

  const [activityData, setActivityData] = useState();
  const [viewPlayer, setViewPlayer] = useState(false);
  const [seeAll, setSellAll] = useState(false);
  const [ArrPlayersList, setArrPlayersList] = useState([0, 1, 2, 3, 4]);

  const onShowAll = () => setSellAll(!seeAll);
  const HomeBanner = [
    {
      image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
    },
    {
      image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
    },
    {
      image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
    },
  ];
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title={route?.params?.item?.activityName}
        onPress={() => goBack()}
        isBack={true}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
        titleColor={white}
        //  rightComponent={(<TouchableOpacity>
        //     <Icon name={"share-variant-outline"} size={26} color={light_grey} />
        // </TouchableOpacity>)}
      >
        <View style={{ marginTop: 20 }}>
          <CarouselCard
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
          />
        </View>
        <View style={{ margin: 20 }}>
          <View
            activeOpacity={0.7}
            style={{
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 20,
                  backgroundColor: primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={"soccer"} size={26} color={white} />
              </View>
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_16,
                  color: black,
                  paddingHorizontal: 8,
                }}
              >
                {"Indian Premier League"}
              </Text>
            </View>

            {/* <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, }}>
                            <Icon name={"cricket"} size={20} color={primary} />
                            <Text style={{ fontFamily: BOLD, fontSize: FontSize.FS_15, color: primary, marginTop: 4, padding: 5, backgroundColor: secondary, borderRadius: 8, marginHorizontal: 10 }}>Cricket</Text>
                        </View> */}

            {/* <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: warmGrey, marginTop: 5 }}>Address</Text> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Icon
                name={"map-marker-radius-outline"}
                size={30}
                color={secondary}
              />
              <View>
                <Text
                  style={{
                    fontFamily: REGULAR,
                    fontSize: FontSize.FS_16,
                    color: black,
                    marginHorizontal: 10,
                  }}
                >
                  Ahemedabad cricket ground
                </Text>
                <Text
                  style={{
                    fontFamily: REGULAR,
                    fontSize: FontSize.FS_16,
                    color: black,
                    marginHorizontal: 10,
                  }}
                >
                  Thaltej
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Icon name={"calendar-range"} size={30} color={secondary} />
              <Text
                style={{
                  fontFamily: REGULAR,
                  fontSize: FontSize.FS_15,
                  color: black,
                  marginHorizontal: 10,
                }}
              >
                12/11/2023
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Icon
                name={"clock-time-five-outline"}
                size={30}
                color={secondary}
              />
              <Text
                style={{
                  fontFamily: REGULAR,
                  fontSize: FontSize.FS_15,
                  color: black,
                  marginHorizontal: 10,
                }}
              >
                10:45 PM
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Icon name={"currency-usd"} size={30} color={secondary} />
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_16,
                  color: black,
                  marginHorizontal: 10,
                }}
              >
                Joining type :{" "}
                <Text
                  style={{
                    fontFamily: REGULAR,
                    fontSize: FontSize.FS_15,
                    color: black,
                    marginHorizontal: 10,
                  }}
                >
                  Free
                </Text>
              </Text>
            </View>

            {/* <View style={{ marginVertical: 5, }}>
                            <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: warmGrey, }}>Description</Text>
                            <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_15, color: secondary_dark_grey, marginVertical: 5 }}>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</Text>
                        </View> */}
          </View>
        </View>
        {/* <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, paddingHorizontal: pixelSizeHorizontal(20) }}>Joined Players</Text>

                <FlatList contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: pixelSizeHorizontal(20) }}
                    data={seeAll ? ArrPlayersList.slice(0, ArrPlayersList.length) : ArrPlayersList.slice(0, 1)}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => (<View style={{ height: heightPixel(10) }}></View>)}
                    ListFooterComponent={() => (<TouchableOpacity onPress={() => { onShowAll() }}
                        style={{ height: heightPixel(80) }}><Text>{seeAll == true ? "See Less" : "See More"}</Text></TouchableOpacity>)}
                    ItemSeparatorComponent={() => (<View style={{ width: SCREEN_WIDTH - 40, height: heightPixel(1), backgroundColor: light_grey }}></View>)}
                    renderItem={({ item }) => (
                        <View
                            activeOpacity={0.7}
                            style={{
                                width: "100%",
                            }}>

                            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, marginVertical: 10, }}>
                                <Icon name={"account-circle-outline"} size={35} color={black} />
                                <View style={{ marginHorizontal: 10 }}>
                                    <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_16, color: warmGrey, }}>{"Mike Smith"}</Text>
                                    <StarRating
                                        fullStarColor={warning}
                                        disabled={false}
                                        maxStars={5}
                                        rating={4}
                                        starSize={16}
                                        containerStyle={{ width: 80 }}
                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                /> */}
      </HeaderView>
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigate("Request");
          }}
          style={CommonStyle.mainBtnStyle}
        >
          <Text style={CommonStyle.mainBtnText}>JOIN</Text>
        </TouchableOpacity>
      </View>
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
});

export default ActivityDetails;
