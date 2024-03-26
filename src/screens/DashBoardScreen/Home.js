import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  black,
  black05,
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
import { FlatList, Input } from "native-base";
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import CarouselCard from "../../commonComponents/Carousel/index";
import HeaderView from "../../commonComponents/HeaderView";
import { ic_gift, ic_group, ic_team } from "../../constants/Images";
import BasicCard from "../../commonComponents/BasicCard";
import { VenuesData, HomeBanner } from "../../DummyData/Data";
import { Colors } from "../../constants/CustomeColor";
import Divider from "../../commonComponents/Divider";
import GamesCard from "../../commonComponents/GamesCard";
import VenuesCard from "../../commonComponents/VenuesCard";
import Carousel from "react-native-banner-carousel";
import IconButton from "../../commonComponents/IconButton";
import ChatIcon from "../../assets/images/ChatIcon";
import { useSelector } from "react-redux";
import { user_data } from "../../redux/reducers/userReducer";
import BellIcon from "../../assets/images/BellIcon";

const Home = () => {
  const userData = useSelector(user_data);

  const [Sport, setSport] = useState("");

  const SelectIntrest = (item) => {
    setSport(item);
  };

  const checkExists = (item) => {
    if (Sport.id === item.id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title=""
        isBack={false}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
        titleColor={Colors.white}
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
            <IconButton
              additionalStyle={{ marginLeft: pixelSizeHorizontal(18) }}
              onPress={() => {}}
            >
              <FastImage
                source={{ uri: userData?.asset_url + userData?.profile }}
                style={{
                  width: widthPixel(40),
                  height: widthPixel(40),
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: white,
                }}
              />
            </IconButton>
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
              activePageIndicatorStyle={{ backgroundColor: primary }}
              // showsPageIndicator={venueImage.length ==1 ? false : true}
              onPageChanged={(index) => {
                console.log("index ::::::", index);
                // setPageIndex(index)
              }}
            >
              {[1, 1].map((image, index) => {
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
                        uri: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
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

          <View style={styles.nearByContainer}>
            <Text style={styles.nearByText}>
              {Translate.t("join_nearby_games")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigate("Venue");
              }}
            >
              <Icon name={"chevron-right"} size={28} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 20,
              paddingHorizontal: pixelSizeHorizontal(20),
            }}
            horizontal
            data={VenuesData}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{ width: widthPixel(20), height: heightPixel(20) }}
              ></View>
            )}
            renderItem={({ item }) => (
              <GamesCard
                cardStyles={{ width: SCREEN_WIDTH / 1.3 }}
                bookMark={false}
              />
            )}
          />

          <View style={[styles.nearByContainer, { marginTop: 0 }]}>
            <Text style={styles.nearByText}>
              {Translate.t("book_nearby_venue")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigate("Venue");
              }}
            >
              <Icon name={"chevron-right"} size={28} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 20,
              paddingHorizontal: pixelSizeHorizontal(20),
            }}
            horizontal
            data={VenuesData}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{ width: widthPixel(20), height: heightPixel(20) }}
              ></View>
            )}
            renderItem={({ item }) => (
              <VenuesCard item={item} styles={{ width: SCREEN_WIDTH / 1.4 }} />
            )}
          />

          <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
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
                    alignItems: "center",paddingVertical: pixelSizeHorizontal(10),
                  }}
                >
                  <FastImage
                    style={styles.subIcon}
                    source={ic_group}
                    resizeMode="cover"
                  />
                  <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                    <Text style={styles.semiText}>Groups</Text>
                    <Text style={[styles.semiSubText,{marginTop:pixelSizeHorizontal(4)}]}>
                      Let's connect and Play
                    </Text>
                  </View>
                </View>
                <Icon name={"chevron-right"} size={28} color={Colors.black} />
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
                  <FastImage
                    style={styles.subIcon}
                    source={ic_team}
                    resizeMode="cover"
                  />
                  <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                    <Text style={styles.semiText}>Manage Player</Text>
                    <Text style={[styles.semiSubText,{marginTop:pixelSizeHorizontal(4)}]}>Manage your Players</Text>
                  </View>
                </View>
                <Icon name={"chevron-right"} size={28} color={Colors.black} />
              </View>
            </BasicCard>
          </View>

          <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
            <BasicCard style={styles.cardContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: pixelSizeHorizontal(10),
                }}
              >
                <FastImage
                  style={styles.subIcon}
                  source={ic_gift}
                  resizeMode="cover"
                />
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.semiText}>Refer a Sport Lover</Text>
                  <Text style={[styles.semiSubText,{marginTop:pixelSizeHorizontal(4)}]}>Refer & Earn a Coupon</Text>
                </View>
              </View>
            </BasicCard>
          </View>
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    color: Colors.black,
  },
  subIcon: {
    width: widthPixel(28),
    height: widthPixel(28),
  },
  semiText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_14,
    color: Colors.black,
  },
  semiSubText: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: Colors.secondaryDarkGrey,
  },
  cardContainer: {
    borderWidth: 0,
    marginBottom: 10,
    
    elevation: 1,
    shadowColor: Colors.black05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 8,
  },
});

export default Home;
