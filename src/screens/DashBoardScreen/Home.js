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
import {
  ic_gift,
  ic_group,
  ic_team,
} from "../../constants/Images";
import BasicCard from "../../commonComponents/BasicCard";
import { VenuesData, HomeBanner } from "../../DummyData/Data";
import { Colors } from "../../constants/CustomeColor";
import Divider from "../../commonComponents/Divider";
import GamesCard from "../../commonComponents/GamesCard";
import VenuesCard from "../../commonComponents/VenuesCard";

const Home = () => {
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
  console.log("width", SCREEN_WIDTH / 1.4);

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title="Welcome to Sport Wale"
        isBack={false}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
        titleColor={white}
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={"map-marker-radius-outline"} size={26} color={white} />
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: REGULAR,
                  fontSize: FontSize.FS_12,
                  color: light_grey,
                  alignSelf: "center",
                }}
              >
                Gujarat
              </Text>

              <Text
                style={{
                  fontFamily: REGULAR,
                  fontSize: FontSize.FS_12,
                  color: white,
                  alignSelf: "center",
                }}
              >
                Ahemedabad
              </Text>
            </View>
          </View>
        }
      >
        <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: pixelSizeHorizontal(20),
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_15,
              color: black,
            }}
          >
            {Translate.t("join_nearby_games")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate("Venue");
            }}
          >
            <Icon name={"chevron-right"} size={28} color={black} />
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
              styles={{ width: SCREEN_WIDTH / 1.4 }}
              bookMark={false}
            />
          )}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            paddingHorizontal: pixelSizeHorizontal(20),
          }}
        >
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_15,
              color: black,
            }}
          >
            {Translate.t("book_nearby_venue")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate("Venue");
            }}
          >
            <Icon name={"chevron-right"} size={28} color={black} />
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
          <BasicCard
            style={{
              borderWidth: 0,
              marginBottom: 10,
              elevation: 1,
              shadowColor: black05,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 8,
            }}
          >
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
                }}
              >
                <FastImage
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={ic_group}
                  resizeMode="cover"
                />
                <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                  <Text
                    style={{
                      fontFamily: BOLD,
                      fontSize: FontSize.FS_14,
                      color: black,
                    }}
                  >
                    Groups
                  </Text>
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_12,
                      color: secondary_dark_grey,
                    }}
                  >
                    Let's connect and Play
                  </Text>
                </View>
              </View>
              <Icon name={"chevron-right"} size={28} color={black} />
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
                }}
              >
                <FastImage
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={ic_team}
                  resizeMode="cover"
                />
                <View style={{ marginLeft: pixelSizeHorizontal(15) }}>
                  <Text
                    style={{
                      fontFamily: BOLD,
                      fontSize: FontSize.FS_14,
                      color: black,
                    }}
                  >
                    Manage Player
                  </Text>
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_12,
                      color: secondary_dark_grey,
                    }}
                  >
                    Manage your Players
                  </Text>
                </View>
              </View>
              <Icon name={"chevron-right"} size={28} color={black} />
            </View>
          </BasicCard>
        </View>

        <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
          <BasicCard
            style={{
              borderWidth: 0,
              marginBottom: 10,
              elevation: 1,
              shadowColor: black05,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FastImage
                style={{
                  width: 28,
                  height: 28,
                }}
                source={ic_gift}
                resizeMode="cover"
              />
              <View style={{ marginLeft: 15 }}>
                <Text
                  style={{
                    fontFamily: BOLD,
                    fontSize: FontSize.FS_14,
                    color: black,
                  }}
                >
                  Refer a Sport Lover
                </Text>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_12,
                    color: secondary_dark_grey,
                  }}
                >
                  Refer & Earn a Coupon
                </Text>
              </View>
            </View>
          </BasicCard>
        </View>
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
});

export default Home;

//  Task Update(05 - 04 - 2023) :

// (SPORTSWALE) :
// 1.  Add venue screen design
// 2.  Activity screen design
// 3.  Create activity screen design
// 4.  Add location model
