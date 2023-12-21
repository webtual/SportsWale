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
import { Divider, FlatList, Input } from "native-base";
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import CarouselCard from "../../commonComponents/Carousel/index";
import HeaderView from "../../commonComponents/HeaderView";
import {
  ic_calender,
  ic_clock,
  ic_gift,
  ic_group,
  ic_navigation,
  ic_team,
  money,
  siren,
  venue,
} from "../../constants/Images";
import BasicCard from "../../commonComponents/BasicCard";
import { VenuesData , HomeBanner } from "../../DummyData/Data";
import { Colors } from "../../constants/CustomeColor";

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
            <TouchableOpacity
              onPress={() => navigate("VenueDetail", { item: item })}
              activeOpacity={0.7}
              style={{
                backgroundColor: "white",
                width: SCREEN_WIDTH / 1.4,
                minHeight: 190,
                // height: 160,
                borderRadius: 10,
                shadowColor: black05,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 8,
                elevation: 3,
                alignSelf: "center",
                paddingLeft: 10,
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>6 a side</Text>
                <Text
                  style={{
                    fontFamily: BOLD,
                    fontSize: FontSize.FS_14,
                    color: black,
                    marginRight: 10,
                  }}
                >
                  Fri,25 Aug,7:00PM
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: BOLD,
                  fontSize: FontSize.FS_15,
                  color: black,
                }}
              >
                FootBall
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                    marginTop: 8,
                  }}
                >
                  {/* First Image */}
                  <FastImage
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 25,
                      overflow: "hidden",
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
                    }}
                    resizeMode="cover"
                  />

                  {/* Second Image */}
                  <FastImage
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 20,
                      position: "absolute",
                      top: 10,
                      left: 35,
                      borderWidth: 3,
                      borderColor: white,
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
                    }}
                    resizeMode="cover"
                  />

                  {/* Third Image */}
                  <FastImage
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 15,
                      position: "absolute",
                      top: 15,
                      left: 65,
                      borderWidth: 3,
                      borderColor: white,
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 5,
                    marginVertical: 10,
                    backgroundColor: primary_light,
                    width: 75,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    flex: 0.5,
                  }}
                >
                  <FastImage
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    source={money}
                    resizeMode="cover"
                  />

                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_14,
                      color: black,
                    }}
                  >
                    INR 499
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    paddingVertical: 5,
                    marginVertical: 10,
                    backgroundColor: primary,
                    width: 120,
                    borderRadius: 6,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginRight: 10,
                  }}
                >
                  <Icon name={"soccer"} size={20} color={white} />
                  <Text
                    style={{
                      fontFamily: REGULAR,
                      fontSize: FontSize.FS_14,
                      color: white,
                    }}
                  >
                    Intermediate
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    marginVertical: 10,
                    backgroundColor: primary_light,
                    width: 130,
                    borderRadius: 6,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FastImage
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={siren}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_14,
                      color: black,
                    }}
                  >
                    Only 5 Slot left
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    paddingVertical: 5,
                    marginVertical: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <FastImage
                    style={{
                      width: 18,
                      height: 18,
                    }}
                    source={ic_navigation}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_14,
                      color: black,
                      marginLeft: 5,
                    }}
                  >
                    Vistara Venue
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    marginVertical: 10,
                    backgroundColor: secondary,
                    width: 70,
                    borderRadius: 6,
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_14,
                      color: white,
                    }}
                  >
                    Booked
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigate("VenueDetail", { item: item })}
              activeOpacity={0.7}
              style={{
                backgroundColor: "white",
                width: SCREEN_WIDTH / 1.4,
                borderRadius: 10,
                minHeight: 190,
                shadowColor: black05,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 8,
                elevation: 3,
                alignSelf: "center",
              }}
            >
              <FastImage
                style={{
                  width: "100%",
                  height: 100,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                source={venue}
                resizeMode="cover"
              />
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
                      numberOfLines={2}
                      style={{
                        fontFamily: BOLD,
                        fontSize: FontSize.FS_13,
                        color: black,
                      }}
                    >
                      {item.venueName}
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
                        fontSize: FontSize.FS_10,
                        color: black,
                      }}
                    >
                      4.5 (147)
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_11,
                    color: secondary_dark_grey,
                  }}
                >
                  S.P. ring Road
                </Text>
                <Divider style={{ marginVertical: pixelSizeVertical(10) }} />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: MEDIUM,
                      fontSize: FontSize.FS_11,
                      color: secondary_dark_grey,
                    }}
                  >
                    Pricing Starting From
                  </Text>
                  <Text
                    style={{
                      fontFamily: BOLD,
                      fontSize: FontSize.FS_11,
                      color: black,
                    }}
                  >
                    INR 1000 Onwards
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
