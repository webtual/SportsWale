import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  black,
  black05,
  disableColor,
  grey,
  light_grey,
  primary,
  primary_light,
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
  widthPixel,
  pixelSizeVertical
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import IconButton from "../../commonComponents/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider, FlatList, Input } from "native-base";
// import { HomeBanner1, HomeBanner2, HomeBanner3 } from '../constants/Images'
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import CarouselCard from "../../commonComponents/Carousel/index";
import HeaderView from "../../commonComponents/HeaderView";
import moment, { updateLocale } from "moment";
import { append } from "domutils";
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

const Home = () => {
  const [Sport, setSport] = useState("");

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
  const PickSport = [
    {
      id: 1,
      SportName: "Cricket",
      SportImage: "cricket",
    },
    {
      id: 2,
      SportName: "Football",
      SportImage: "soccer",
    },
    {
      id: 3,
      SportName: "Cycling",
      SportImage: "bike",
    },
    {
      id: 4,
      SportName: "Baseball",
      SportImage: "baseball",
    },
    {
      id: 5,
      SportName: "Swimming",
      SportImage: "swim",
    },
    {
      id: 6,
      SportName: "Tennis",
      SportImage: "tennis",
    },
    {
      id: 7,
      SportName: "Volley ball",
      SportImage: "volleyball",
    },

    {
      id: 8,
      SportName: "Basketball",
      SportImage: "basketball",
    },
    {
      id: 9,
      SportName: "Water polo",
      SportImage: "water-polo",
    },
  ];

  const VenuesData = [
    {
      image:
        "https://content.jdmagicbox.com/comp/delhi/s4/011pxx11.xx11.151026131555.u2s4/catalogue/t-n-memorial-cricket-academy-nyay-khand-1-indirapuram-delhi-cricket-coaching-classes-g3hscbmrj5.jpg",
      venueName: "Ahemedabad cricket ground",
      venueAddress: "Ahemedabad",
      rating: "5.0",
    },
    {
      image:
        "https://media.hudle.in/venues/e5438e14-eef5-4ef7-8d40-2893200604b0/photo/91577a635c28585de0603a74f2bd7cf2014f27c4",
      venueName: "Vikramnagar Football Ground",
      venueAddress: "Ranip",
      rating: "5.0",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJF5wMaNyC_atpMCOVJhDT-BuOFLkQ_4qpA&usqp=CAU",
      venueName: "ACC cricket ground",
      venueAddress: "Thaltej",
      rating: "5.0",
    },
    {
      image:
        "https://media.istockphoto.com/id/1130905980/photo/universal-grass-stadium-illuminated-by-spotlights-and-empty-green-grass-playground.jpg?b=1&s=170667a&w=0&k=20&c=7t-jHN-NyuCMH2S9BwUGmQBjbMZaRCykeG86n1PYaD0=",
      venueName: "Colosseum Ahmedabad",
      venueAddress: "Prahald nagar",
      rating: "5.0",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR355I7R0GFo-MLsVRZ0NPICjpTVSRG1T8gyQ&usqp=CAU",
      venueName: "Ahemedabad cricket ground",
      venueAddress: "Ghatlodia",
      rating: "5.0",
    },
    {
      image:
        "https://i1.wp.com/cricketgraph.com/wp-content/uploads/2017/06/LOGO-2.jpg?fit=613%2C341&ssl=1",
      venueName: "Kankaria Football Ground (Maninagar)",
      venueAddress: "Nikol",
      rating: "5.0",
    },
    {
      image:
        "https://content.jdmagicbox.com/comp/delhi/s4/011pxx11.xx11.151026131555.u2s4/catalogue/t-n-memorial-cricket-academy-nyay-khand-1-indirapuram-delhi-cricket-coaching-classes-g3hscbmrj5.jpg",
      venueName: "Ahemedabad cricket ground",
      venueAddress: "Naroda",
      rating: "5.0",
    },
    {
      image:
        "https://cdn3.mycity4kids.com/images/article-images/mobile-web/details/img-20160912-57d683c46cf11.jpg",
      venueName: "Table Tennis Association of Ahmedabad",
      venueAddress: "Bodakdev",
      rating: "5.0",
    },
  ];

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

        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 15,
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
            {Translate.t("select_sport")}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_15,
                color: black,
              }}
            >
              See more
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 20
                }}
                data={PickSport}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (<View style={{ width: widthPixel(15) }}></View>)}
                renderItem={({ item }) => (
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <TouchableOpacity onPress={() => SelectIntrest(item)}
                            style={{
                                backgroundColor: checkExists(item) == true ? primary : primary_light,
                                width: 60,
                                height: 60,
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                                borderRadius: 50,
                            }}>
                            <Icon name={item.SportImage} size={42} color={checkExists(item) == true ? white : primary} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: black, marginVertical: 5 }}>{item.SportName}</Text>
                    </View>
                )}
            /> */}

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
            // <TouchableOpacity
            //   onPress={() => navigate("VenueDetail", { item: item })}
            //   activeOpacity={0.7}
            //   style={{
            //     backgroundColor: "white",
            //     width: SCREEN_WIDTH / 1.4,
            //     minHeight: 190,
            //     // height: 160,
            //     borderRadius: 10,
            //     shadowColor: black05,
            //     shadowOffset: {
            //       width: 0,
            //       height: 3,
            //     },
            //     shadowOpacity: 0.17,
            //     shadowRadius: 8,
            //     elevation: 3,
            //     alignSelf: "center",
            //   }}
            // >
            //   <FastImage
            //     style={{
            //       width: "100%",
            //       height: 100,
            //       borderTopLeftRadius: 10,
            //       borderTopRightRadius: 10,
            //     }}
            //     source={{ uri: item.image }}
            //     resizeMode="cover"
            //   />
            //   <View
            //     style={{
            //       marginVertical: pixelSizeHorizontal(5),
            //       flexDirection: "row",
            //       justifyContent: "space-between",
            //       alignItems: "center",
            //     }}
            //   >
            //     {/* <View style={{ marginHorizontal: 8, flex: 1 }}>
            //       <Text
            //         numberOfLines={2}
            //         style={{
            //           fontFamily: SEMIBOLD,
            //           fontSize: FontSize.FS_12,
            //           color: black,
            //         }}
            //       >
            //         {item.venueName}
            //       </Text>
            //       <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: -5, marginTop: 3 }}>
            //       <Icon name={"map-marker-radius-outline"} size={20} color={primary} />
            //       <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: secondary_dark_grey, }}>{item.venueAddress}</Text>
            //       </View>
            //     </View> */}
            //     <View
            //       style={{
            //         flexDirection: "row",
            //         alignItems: "center",
            //         marginRight: 10,
            //       }}
            //     >
            //       <Text
            //         style={{
            //           fontFamily: REGULAR,
            //           fontSize: FontSize.FS_10,
            //           color: secondary_dark_grey,
            //         }}
            //       >
            //         {item.venueAddress}
            //       </Text>

            //       {/*  <Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_14, color: secondary_dark_grey, marginHorizontal: 5 }}>{item.rating}</Text>
            //                     <Icon name={"star"} size={20} color={warning} /> */}
            //     </View>
            //   </View>
            //   <View
            //     style={{
            //       marginVertical: pixelSizeHorizontal(5),
            //       flexDirection: "row",
            //       justifyContent: "space-between",
            //       alignItems: "center",
            //     }}
            //   >
            //     <View
            //       style={{
            //         marginHorizontal: 8,
            //         flex: 1,
            //         flexDirection: "row",
            //         alignItems: "center",
            //       }}
            //     >
            //       <FastImage
            //         style={{ width: 15, height: 15 }}
            //         source={ic_calender}
            //       />
            //       <Text
            //         style={{
            //           fontFamily: SEMIBOLD,
            //           fontSize: FontSize.FS_11,
            //           color: secondary_dark_grey,
            //           marginLeft: 5,
            //         }}
            //       >
            //         {moment(new Date()).format("ddd, DD MMM YYYY ")}
            //       </Text>
            //     </View>
            //     <View
            //       style={{
            //         flexDirection: "row",
            //         alignItems: "center",
            //         marginRight: 10,
            //       }}
            //     >
            //       <FastImage
            //         style={{ width: 15, height: 15 }}
            //         source={ic_clock}
            //       />
            //       <Text
            //         style={{
            //           fontFamily: REGULAR,
            //           fontSize: FontSize.FS_10,
            //           color: secondary_dark_grey,
            //           marginLeft: 5,
            //         }}
            //       >
            //         {moment(new Date()).format("hh:mm A")}
            //       </Text>
            //     </View>
            //   </View>
            // </TouchableOpacity>
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
