import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import {
  black,
  dim_grey,
  error,
  primary,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import { user_data } from "../../redux/reducers/userReducer";
import { Input, useToast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "../../commonComponents/LoadingView";
import ApiManager from "../../commonComponents/ApiManager";
import { getUniqueListBy } from "../../commonComponents/Utils";
import { GET_BOOKING_HISTORY } from "../../constants/ApiUrl";
import CommonStyle from "../../commonComponents/CommonStyle";
import FastImage from "react-native-fast-image";
import NavigationIcon from "../../assets/images/NavigationIcon";
import moment from "moment";
import { RUPEE } from "../../constants/ConstantKey";

const BookingHistory = () => {
  const toast = useToast();
  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("UPCOMING");
  const [allBookingList, setAllBookingList] = useState([]);

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    console.log("Booking History effect call");

    Api_GetBookingHistoryList(true);
  }, [page, type]);

  const Api_GetBookingHistoryList = (isLoad) => {
    setIsLoading?.(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("type", type);

    ApiManager.post(GET_BOOKING_HISTORY, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetBookingHistoryList : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allBookingList,
              ...response.data.data.transactions,
            ];
            setAllBookingList(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allBookingList,
              ...response.data.data.transactions,
            ];
            setAllBookingList(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_GetBookingHistoryList Error ", err);
      });
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Booking History"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={[type == "UPCOMING" ? styles.btnSelected : styles.btn]}
              onPress={() => {
                setType("UPCOMING");
                setPage(1);
                setAllBookingList([]);
              }}
            >
              <Text
                style={[
                  styles.btnText,
                  {
                    color: type == "UPCOMING" ? white : dim_grey,
                  },
                ]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                type == "PAST" ? styles.btnSelected : styles.btn,
                {
                  marginHorizontal: pixelSizeHorizontal(10),
                },
              ]}
              onPress={() => {
                setType("PAST");
                setPage(1);
                setAllBookingList([]);
              }}
            >
              <Text
                style={[
                  styles.btnText,
                  {
                    color: type == "PAST" ? white : dim_grey,
                  },
                ]}
              >
                Past
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                type == "CANCELLED" ? styles.btnSelected : styles.btn,
                {},
              ]}
              onPress={() => {
                setType("CANCELLED");
                setPage(1);
                setAllBookingList([]);
              }}
            >
              <Text
                style={[
                  styles.btnText,
                  {
                    color: type == "CANCELLED" ? white : dim_grey,
                  },
                ]}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{ flex: 1, paddingHorizontal: pixelSizeHorizontal(5) }}
            data={allBookingList}
            scrollEnabled
            nestedScrollEnabled={true}
            // extraData={props}
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
              ) : (
                <View style={{ height: widthPixel(20) }} />
              )
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
            renderItem={({ item }) => {
              var info =
                item?.purpose == "JOINING"
                  ? item?.joining_information
                  : item?.venue_booked_information;
              return (
                <View style={[styles.cardView, CommonStyle.shadow]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          height: widthPixel(30),
                          width: widthPixel(30),
                          borderRadius: widthPixel(15),
                          backgroundColor: primary_light,
                          padding: pixelSizeHorizontal(5),
                        }}
                      >
                        <FastImage
                          source={{
                            uri: userData?.asset_url + info?.game_image,
                          }}
                          resizeMode={"contain"}
                          style={{ flex: 1 }}
                        />
                      </View>
                      <Text
                        style={[
                          styles.titleText,
                          { marginHorizontal: pixelSizeHorizontal(10) },
                        ]}
                      >
                        {info?.game_title}
                      </Text>
                      <Text style={[styles.descriptionText]}>
                        {info?.venue_ground_title}
                      </Text>
                    </View>

                    <Text style={[styles.titleText]}>
                      {RUPEE}
                      {item?.amount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: pixelSizeHorizontal(10),
                    }}
                  >
                    <NavigationIcon
                      width={widthPixel(20)}
                      height={widthPixel(20)}
                    />
                    <Text
                      style={[
                        {
                          marginLeft: pixelSizeHorizontal(10),
                          flex: 1,
                          fontFamily: MEDIUM,
                          fontSize: FontSize.FS_12,
                          color: black,
                        },
                      ]}
                    >
                      {info?.venue_location}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: pixelSizeHorizontal(10),
                      flex: 1,
                      borderWidth: 1,
                      borderColor: primary_light,
                      borderRadius: widthPixel(5),
                      paddingVertical: pixelSizeHorizontal(7),
                      paddingHorizontal: pixelSizeHorizontal(14),
                      flexWrap: "wrap",
                    }}
                  >
                    <Text
                      style={[
                        styles.descriptionText,
                        { fontSize: FontSize.FS_14 },
                      ]}
                    >
                      {moment(info?.event_date).format("ddd, DD MMM, YYYY")} |{" "}
                      {info?.display_event_start_time} to{" "}
                      {info?.display_event_end_time}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: pixelSizeHorizontal(16),
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: primary_light,
                        borderRadius: widthPixel(5),
                        paddingVertical: pixelSizeHorizontal(8),
                        paddingHorizontal: pixelSizeHorizontal(5),
                      }}
                    >
                      <Text style={[styles.descriptionText]}>
                        <Text style={{ color: primary }}>Booking ID : </Text>
                        {item?.reference_number}
                      </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          {
                            fontSize: FontSize.FS_10,
                            fontFamily: REGULAR,
                            color: black,
                            textAlign: "right",
                          },
                        ]}
                      >
                        Booked on :{" "}
                        {moment(item?.created_at).format("DD MMM YYYY")}
                      </Text>
                    </View>
                  </View>

                  {info?.is_cancelled ? (
                    <Text
                      style={[
                        {
                          fontFamily: MEDIUM,
                          fontSize: FontSize.FS_12,
                          color: error,
                          marginTop: pixelSizeHorizontal(10),
                          textTransform: "uppercase",
                        },
                      ]}
                    >
                      Cancelled booking on{" "}
                      {moment(info?.cancelled_on).format(
                        "DD MMM YYYY [AT] HH:MM A"
                      )}
                    </Text>
                  ) : null}
                </View>
              );
            }}
          />
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  btnSelected: {
    borderRadius: widthPixel(5),
    marginVertical: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(12),
    backgroundColor: secondary,
    minWidth: widthPixel(100),
  },
  btn: {
    borderRadius: widthPixel(5),
    marginVertical: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(12),
    borderWidth: 1,
    borderColor: dim_grey,
    minWidth: widthPixel(100),
  },
  btnText: {
    color: white,
    textAlign: "center",
    fontFamily: BOLD,
    fontSize: FontSize.FS_12,
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
  cardView: {
    backgroundColor: white,
    borderRadius: widthPixel(20),
    padding: pixelSizeHorizontal(12),
  },
  titleText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_16,
    color: black,
    // flex: 1,
  },
  descriptionText: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: black,
    // flex: 1,
  },
});
export default BookingHistory;
