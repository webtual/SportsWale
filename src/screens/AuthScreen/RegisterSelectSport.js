import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  black,
  light_grey,
  primary,
  primary_light,
  secondary,
  seprator,
  warmGrey,
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
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { goBack, navigate } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import FastImage from "react-native-fast-image";
import TextInputView from "../../commonComponents/TextInputView";
import { ic_mobile, ic_user } from "../../constants/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { Log } from "../../commonComponents/Log";
import { useFocusEffect } from "@react-navigation/native";
import CommonStyle from "../../commonComponents/CommonStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { BottomModal } from "../../commonComponents/Popup";

const RegisterSelectSport = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const [txtSearch, setTxtSearch] = useState("");

  const [openChooseLevelModal, setOpenChooseLevelModal] = useState(false);

  useFocusEffect(useCallback(() => {}, []));

  const ArrLevels = [
    {
      id: 1,
      color: "#008000",
      title: "Beginner",
    },
    {
      id: 2,
      color: "#FF4500",
      title: "Intermediate",
    },
    {
      id: 3,
      color: "#00ff00",
      title: "Advance",
    },
  ];
  const [selectedLevel, setSelectedLevel] = useState(null);

  const IntrestData = [
    {
      id: 1,
      title: "Cricket",
      image: "cricket",
    },
    {
      id: 2,
      title: "Football",
      image: "soccer",
    },
    {
      id: 3,
      title: "Cycling",
      image: "bike",
    },
    {
      id: 4,
      title: "Baseball",
      image: "baseball",
    },
    {
      id: 5,
      title: "Swimming",
      image: "swim",
    },
    {
      id: 6,
      title: "Tennis",
      image: "tennis",
    },
    {
      id: 7,
      title: "Volley ball",
      image: "volleyball",
    },

    {
      id: 8,
      title: "Basketball",
      image: "basketball",
    },
    {
      id: 9,
      title: "Water polo",
      image: "water-polo",
    },
  ];
  const [selectedInterest, setSelectedInterest] = useState(null);

  const [filteredGame, setFilteredGame] = useState(IntrestData);

  const SelectIntrest = (item, interest) => {
    console.log("ITEM :", interest);
    var selectedData = [...selectedList];

    let filter = selectedData.filter((x) => x.id === interest.id);
    console.log("filter", filter);
    if (filter.length) {
      console.log("if");
      let filter = selectedData.filter((x) => x.id != interest.id);
      selectedData = filter;
    } else {
      console.log("else");
      var finalInterest = interest;
      finalInterest["level"] = item;
      selectedData.push(finalInterest);
    }
    console.log("====================================");
    console.log("selectedData", selectedData);
    console.log("====================================");
    setSelectedList(selectedData);

    setOpenChooseLevelModal(false);
    setSelectedInterest(null)
  };

  const checkExists = (item) => {
    let filter = selectedList.filter((x) => x.id === item.id);
    if (filter.length) {
      return true;
    } else {
      return false;
    }
  };
  const OnPressNext = () => {

    console.log("selected list : ",selectedList)

    // navigate("RegisterWhatLearn", { SportData: selectedList });
  };

  const onSearchGame = (search) => {
    let text = search.toLowerCase();
    let ServiceData = IntrestData;

    let filteredName = ServiceData.filter((item) => {
      let name =
        item.title != null ? String(item.title).toLowerCase().match(text) : "";

      return name;
    });

    console.log(filteredName);
    if (!text || text === "") {
      console.log("Text empty");
      setFilteredGame(IntrestData);
    } else if (filteredName.length == 0) {
      setFilteredGame([]);
    } else if (!Array.isArray(filteredName) && filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setFilteredGame([]);
    } else if (Array.isArray(filteredName)) {
      setFilteredGame(filteredName);
    }

    setTxtSearch(search);
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={Translate.t("participate")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginTop: 20 }}>
          <TextInputView
            icon={<Feather name={"search"} size={20} color={secondary} />}
            onChangeText={(text) => onSearchGame(text)}
            value={txtSearch}
            placeholder={Translate.t("search_game")}
            clearButtonMode="while-editing"
          />
          {filteredGame.length ? (
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_16,
                color: black,
                marginTop: 26,
              }}
            >
              {Translate.t("select_sport")}
            </Text>
          ) : null}

          <FlatList
            keyboardShouldPersistTaps={"always"}
            scrollEnabled={false}
            data={filteredGame}
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              // justifyContent:"center",
            }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  marginVertical: 14,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    var filterData = selectedList?.filter(
                      (x) => x?.id == item.id
                    );
                    console.log("filterData ",filterData)
                    if (filterData.length) {
                      let filterFinal = selectedList?.filter(
                        (x) => x.id != item.id
                      );
                      setSelectedList(filterFinal);
                    } else {
                      setSelectedInterest(item);
                      setOpenChooseLevelModal(true);
                    }
                  }}
                  style={{
                    backgroundColor:
                      checkExists(item) == true ? primary : primary_light,
                    marginHorizontal: 10,
                    width: 60,
                    height: 60,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                >
                  <Icon
                    name={item.image}
                    size={42}
                    color={checkExists(item) == true ? white : primary}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_14,
                    color: black,
                    marginVertical: 5,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      </HeaderView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          OnPressNext();
        }}
        style={[CommonStyle.mainBtnStyle, { margin: pixelSizeHorizontal(20) }]}
      >
        <Text style={CommonStyle.mainBtnText}>{Translate.t("lets_play")}</Text>
      </TouchableOpacity>

      <BottomModal
        isVisible={openChooseLevelModal}
        onClose={() => {
          setOpenChooseLevelModal(false);
          setSelectedInterest(null)
        }}
        title={Translate.t("choose_level")}
      >
        <View style={{ margin: 10 }}>
          <FlatList
            scrollEnabled={false}
            data={ArrLevels}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: pixelSizeHorizontal(10),
                    // borderBottomColor: seprator,
                    // borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    SelectIntrest(item, selectedInterest);
                  }}
                >
                    <Icon
                    name={"circle"}
                    size={10}
                    color={item.color}
                  />
                  <Text style={[CommonStyle.regularText, { flex: 1, marginHorizontal:pixelSizeHorizontal(10) }]}>
                    {item.title}
                  </Text>
                  <Icon
                    name={
                      selectedLevel?.id == item.id
                        ? "radiobox-marked"
                        : "radiobox-blank"
                    }
                    size={18}
                    color={selectedLevel?.id == item.id ? primary : black}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </BottomModal>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({});

export default RegisterSelectSport;
