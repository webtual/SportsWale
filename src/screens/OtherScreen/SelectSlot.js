import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
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
  dim_grey,
  grey,
  offWhite,
  primary,
  primary_light,
  secondary,
  transparent,
  white,
} from "../../constants/Color";

const SelectSlot = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Sport, setSport] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedGround, setSelectedGround] = useState(null);

  const [DateSlot, setDateSlot] = useState([]);
  const [MorningSlot, setMorningSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
  const [AfternoonSlot, setAfterNoonSLot] = useState([]);
  const [EveningSlot, setEveningSlot] = useState([]);
  const [NightSLot, setNightSlot] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      var data = [1, 2, 3, 4, 5, 6, 7];
      var arr = [new Date()];
      data.map((item) => {
        var date = new Date();
        date.setDate(date.getDate() + item);
        arr.push(date);
        setDateSlot(arr);
      });
      setSelectedDate(arr[0]);

      let morning = slotCreator.createSlot(
        "06:00",
        "24:00",
        "60",
        null,
        null,
        true
      );
      setMorningSlot(morning);
      setSelectedTimeSlot([morning[0]]);
      // let afternoon = slotCreator.createSlot("012:00","18:00","60")
      // setAfterNoonSLot(afternoon)

      // let evening = slotCreator.createSlot("18:00","24:00","60")
      // setEveningSlot(evening)

      // let night = slotCreator.createSlot("21:00","24:00","60")
      // setNightSlot(night)
    }, [])
  );
  const SelectIntrest = (item) => {
    setSelectedDate(item);
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
    var selectedData = [...selectedTimeSlot];

    let filter = selectedData.filter((x) => x === item);
    console.log("filter", filter);
    if (filter.length) {
      console.log("if");
      let filter = selectedData.filter((x) => x != item);
      selectedData = filter;
    } else {
      console.log("else");
      selectedData.push(item);
    }
    console.log("====================================");
    console.log("selectedData", selectedData.length);
    console.log("====================================");
    setSelectedTimeSlot(selectedData);
  };

  const checkTimeSlot = (item) => {
    let filter = selectedTimeSlot.filter((x) => x === item);
    if (filter.length) {
      return true;
    } else {
      return false;
    }
  };
  const OnPressNext = () => {
    navigate("Payment");
    
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
              fontFamily: MEDIUM,
              fontSize: FontSize.FS_18,
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
            data={[
              { name: "Turf 1" },
              { name: "Turf 2" },
              { name: "Turf 3" },
              { name: "Turf 4" },
            ]}
            contentContainerStyle={{
              flexDirection: "row",
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor :  selectedGround?.name == item.name
                    ? secondary
                    : primary,
                    marginRight: 10,
                    borderRadius: 5,
                    backgroundColor:
                      selectedGround?.name == item.name
                        ? secondary
                        : white,
                    marginVertical: pixelSizeHorizontal(5),
                  }}
                  // disabled={isDisabled}
                  onPress={() => setSelectedGround(item)}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      selectedGround?.name == item.name &&
                        styles.selectedItemText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <Text
            style={{
              fontFamily: MEDIUM,
              fontSize: FontSize.FS_18,
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
                      checkExists(item) == true ? secondary : white,
                      borderWidth : 1,
                      borderColor : checkExists(item) == true ? secondary : primary,
                    marginHorizontal: pixelSizeHorizontal(5),
                    justifyContent: "center",
                    alignItems : 'center',
                    borderRadius: 5,
                    paddingHorizontal : 10
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
          <Text
            style={{
              fontFamily: MEDIUM,
              fontSize: FontSize.FS_18,
              color: black,
              margin: pixelSizeHorizontal(5),
            }}
          >
            {Translate.t("available_slot")}
          </Text>
          <FlatList
            data={MorningSlot}
            contentContainerStyle={{}}
            numColumns={3}
            renderItem={({ item }) => (
              <View
                style={{
                  // alignItems: "center",
                  marginVertical: 8,
                  justifyContent: "center",
                  flex: 1 / 3,
                }}
              >
                <TouchableOpacity
                  onPress={() => selectTimeSLot(item)}
                  style={{
                    borderColor:
                      checkTimeSlot(item) == true ? transparent : primary,
                    backgroundColor:
                      checkTimeSlot(item) == true ? secondary : white,
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
                      fontSize: FontSize.FS_16,
                      color: checkTimeSlot(item) == true ? white : primary,
                      textAlign: "center",
                    }}
                  >
                    {item == "0:00 P.M" ? "12:00 P.M" : item}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
          onPress={() => {
            OnPressNext();
          }}
          style={styles.btn}
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
    backgroundColor: Colors.black,
    padding: pixelSizeHorizontal(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: pixelSizeHorizontal(20),
  },
  menuItemText: {
    color: Colors.black,
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

export default SelectSlot;
