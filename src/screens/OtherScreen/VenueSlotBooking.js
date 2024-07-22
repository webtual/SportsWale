import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "../../constants/CustomeColor";
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
} from "../../commonComponents/ResponsiveScreen";
import { goBack, navigate } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import { useFocusEffect } from "@react-navigation/native";
import CommonStyle from "../../commonComponents/CommonStyle";
import moment from "moment";
import { slotCreator } from "react-native-slot-creator";
import {
  black,
  border,
  dim_grey,
  grey,
  light_grey_02,
  offWhite,
  primary,
  primary_light,
  secondary,
  transparent,
  white,
} from "../../constants/Color";
import { useToast } from "native-base";
import SportItem from "../../commonComponents/SportItem";
import ApiManager from "../../commonComponents/ApiManager";
import { VENUE_TIMESLOT } from "../../constants/ApiUrl";

const VenueSlotBooking = (props) => {
  const toast = useToast();
  const { venueDetail, type } = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGround, setSelectedGround] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);

  const [DateSlot, setDateSlot] = useState([]);
  const [TimeSlot, setTimeSlot] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     var data = [1, 2, 3, 4, 5, 6, 7];
  //     var arr = [new Date()];
  //     data.map((item) => {
  //       var date = new Date();
  //       date.setDate(date.getDate() + item);
  //       arr.push(date);
  //       setDateSlot(arr);
  //     });
  //     //   setSelectedDate(arr[0]);

  //     //   slotCreate();
  //   }, [])
  // );

  useEffect(() => {
    var data = [1, 2, 3, 4, 5, 6, 7];
    var arr = [new Date()];
    data.map((item) => {
      var date = new Date();
      date.setDate(date.getDate() + item);
      arr.push(date);
      setDateSlot(arr);
    });
    //   setSelectedDate(arr[0]);

    //   slotCreate();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      Api_Get_TimeSlots(true);
    }
  }, [selectedDate]);

  const Api_Get_TimeSlots = (isLoad) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("venue_id", selectedGround?.venue_id);
    formData.append("venue_ground_id", selectedGround?.venue_ground_id);
    formData.append("venue_game_id", selectedGround?.venue_game_id);
    formData.append("date", moment(selectedDate).format("DD-MM-YYYY"));

    ApiManager.post(VENUE_TIMESLOT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_TimeSlots : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setTimeSlot(response.data.data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_TimeSlots Error ", err);
      });
  };

  const slotCreate = () => {
    let slots = slotCreator.createSlot(
      venueDetail?.start_time,
      venueDetail?.end_time,
      "60",
      null,
      null,
      true
    );
    setTimeSlot(slots);
    // setSelectedTimeSlot([morning[0]]);
  };

  const SelectIntrest = (item) => {
    if (selectedGround && selectedSport) {
      setSelectedDate(item);
      setSelectedTimeSlot([]);
    } else {
      toast.show({
        description: "please select ground and sports first",
      });
    }
  };

  const checkExists = (item) => {
    if (selectedDate === item) {
      return true;
    } else {
      return false;
    }
  };

  const selectTimeSLot = (item) => {
    console.log("ITEM :", item);
    var selectedData = [...selectedTimeSlot]

    let filter = selectedData?.filter((x) => x?.id === item?.id);
    console.log("filter", filter);
    if (filter?.length) {
      console.log("if");
      let filter = selectedData.filter((x) => x?.id != item?.id);
      selectedData = filter;
    } else {
      console.log("else");
      selectedData = [item]
      // selectedData.push(item); open this comment for multiple selection
    }
    console.log("====================================");
    console.log("selectedData", selectedData);
    console.log("====================================");
    setSelectedTimeSlot(selectedData);
  };

  const checkTimeSlot = (item) => {
    let filter = selectedTimeSlot?.filter((x) => x?.id === item.id);
    if (filter?.length) {
      return true;
    } else {
      return false;
    }
  };
  const OnPressNext = () => {
    if (selectedSport == null) {
      toast.show({
        description: "Please select sport",
      });
    } else if (selectedGround == null) {
      toast.show({
        description: "Please select ground",
      });
    } else if (selectedDate == null) {
      toast.show({
        description: "Please select date",
      });
    } else if (selectedTimeSlot.length == 0) {
      toast.show({
        description: "Please select time slots",
      });
    } else {
      navigate("Payment", {venueDetail : venueDetail,type : type, selectedSlots : {
        sport : selectedSport,
        ground : selectedGround,
        date : selectedDate,
        time : selectedTimeSlot
      }});
    }
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={Translate.t("select_slot")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginVertical: pixelSizeHorizontal(10) }}>
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_16,
              color: black,
              margin: pixelSizeHorizontal(5),
            }}
          >
            Select Sport
          </Text>

          <FlatList
            style={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={venueDetail?.venue_games}
            contentContainerStyle={{
              flexDirection: "row",
            }}
            renderItem={({ item }) => {
              return (
                <SportItem
                  item={item}
                  isSelected={selectedSport?.id == item?.id}
                  onPressItem={() => {
                    setSelectedSport(item);
                    setSelectedGround(null);
                    setSelectedDate(null);
                    setTimeSlot([]);
                    setSelectedTimeSlot([]);
                  }}
                />
              );
            }}
          />

          {selectedSport ? (
            <>
              <Text
                style={{
                  fontFamily: BOLD,
                  fontSize: FontSize.FS_16,
                  color: black,
                  margin: pixelSizeHorizontal(5),
                }}
              >
                Select Ground
              </Text>

              <FlatList
                style={{}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={selectedSport?.grounds}
                contentContainerStyle={{
                  flexDirection: "row",
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor:
                          selectedGround?.id == item.id ? secondary : dim_grey,
                        marginRight: 10,
                        borderRadius: 5,
                        backgroundColor:
                          selectedGround?.id == item.id ? secondary : white,
                        marginVertical: pixelSizeHorizontal(5),
                      }}
                      // disabled={isDisabled}
                      onPress={() => {
                        setSelectedGround(item);
                        setSelectedDate(null);
                        setTimeSlot([]);
                        setSelectedTimeSlot([]);
                      }}
                    >
                      <Text
                        style={[
                          styles.menuItemText,
                          selectedGround?.id == item.id &&
                            styles.selectedItemText,
                        ]}
                      >
                        {item.ground_title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          ) : null}

          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_16,
              color: black,
              marginTop: pixelSizeHorizontal(5),
            }}
          >
            Select Date
          </Text>

          <FlatList
            data={DateSlot}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 14,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => SelectIntrest(item)}
                  style={{
                    backgroundColor:
                      checkExists(item) == true ? secondary : primary_light,
                    // borderWidth : 1,
                    // borderColor : checkExists(item) == true ? secondary : primary,
                    marginHorizontal: pixelSizeHorizontal(5),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_14,
                      color: checkExists(item) == true ? white : black,
                      marginVertical: 5,
                      textAlign: "center",
                    }}
                  >
                    {moment(item).format("ddd[\n]DD[\n]YYYY")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {TimeSlot.length ? (
            <>
              <Text
                style={{
                  fontFamily: BOLD,
                  fontSize: FontSize.FS_16,
                  color: black,
                  margin: pixelSizeHorizontal(5),
                }}
              >
                {Translate.t("available_slot")}
              </Text>
              <FlatList
                data={TimeSlot}
                contentContainerStyle={{}}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      // alignItems: "center",
                      marginVertical: 8,
                      justifyContent: "center",
                      flex: 1 / 2,
                    }}
                  >
                    <TouchableOpacity
                      disabled={!item?.is_available}
                      onPress={() => selectTimeSLot(item)}
                      style={{
                        borderColor: item?.is_available
                          ? checkTimeSlot(item) == true
                            ? transparent
                            : primary
                          : grey,
                        backgroundColor: item?.is_available
                          ? checkTimeSlot(item) == true
                            ? secondary
                            : white
                          : grey,
                        borderWidth: widthPixel(1),
                        marginHorizontal: pixelSizeHorizontal(5),
                        paddingVertical: widthPixel(8),
                        paddingHorizontal: widthPixel(10),
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: SEMIBOLD,
                          fontSize: FontSize.FS_12,
                          color: item?.is_available
                            ? checkTimeSlot(item) == true
                              ? white
                              : primary
                            : dim_grey,
                          textAlign: "center",
                        }}
                      >
                        {item?.display_time_start} - {item?.display_time_end}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          ) : (
            <View style={{ marginTop: pixelSizeHorizontal(30) }}>
              <Text
                style={[
                  styles.selectedItemText,
                  { color: dim_grey, textAlign: "center" },
                ]}
              >
                {selectedSport &&
                selectedGround &&
                selectedDate &&
                TimeSlot.length == 0
                  ? "No slots found"
                  : "Please select ground, sport and date to fetch available time slots"}
              </Text>
            </View>
          )}
        </View>
      </HeaderView>
      <View
        style={{
          backgroundColor: white,
          width: "100%",
          paddingHorizontal: pixelSizeHorizontal(20),
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={
            !(
              selectedSport &&
              selectedGround &&
              selectedDate &&
              selectedTimeSlot.length != 0
            )
          }
          onPress={() => {
            OnPressNext();
          }}
          style={[
            styles.btn,
            {
              backgroundColor:
                selectedSport &&
                selectedGround &&
                selectedDate &&
                selectedTimeSlot.length != 0
                  ? black
                  : grey,
            },
          ]}
        >
          <Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                backgroundColor: grey,
              }}
            ></View>
            <Text style={styles.text}>{"Booked"}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                backgroundColor: white,
                borderWidth: 1,
                borderColor: primary,
              }}
            ></View>
            <Text style={styles.text}>{"Available"}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                backgroundColor: secondary,
              }}
            ></View>
            <Text style={styles.text}>{"Selected"}</Text>
          </View>
        </View>
      </View>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
    color: dim_grey,
    marginLeft: 5,
  },
  btn: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: pixelSizeHorizontal(20),
  },
  menuItemText: {
    color: dim_grey,
    paddingVertical: 5,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
    marginLeft: 5,
  },
  selectedItemText: {
    color: Colors.white,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
  },
});
export default VenueSlotBooking;
