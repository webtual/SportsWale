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
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  black,
  green,
  light_grey,
  orange,
  primary,
  primary_light,
  secondary,
  seprator,
  warmGrey,
  white,
  yellow,
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
import { goBack, navigate, resetScreen } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
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
import ApiManager from "../../commonComponents/ApiManager";
import { GET_GAMES, REGISTER } from "../../constants/ApiUrl";
import { useToast } from "native-base";
import { storeData } from "../../commonComponents/AsyncManager";
import { BEARER_TOKEN, USER_DATA } from "../../constants/ConstantKey";
import { storeUserData } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { getFileNameFromPath } from "../../commonComponents/Utils";

const RegisterSelectSport = (props) => {

  const dispatch = useDispatch()
  const toast = useToast()

  const { registerData } = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const [txtSearch, setTxtSearch] = useState("");

  const [openChooseLevelModal, setOpenChooseLevelModal] = useState(false);

  useFocusEffect(useCallback(() => {}, []));

  const ArrLevels = [
    {
      id: 1,
      color: orange,
      title: "Beginner",
    },
    {
      id: 2,
      color: yellow,
      title: "Intermediate",
    },
    {
      id: 3,
      color: green,
      title: "Advance",
    },
  ];
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [IntrestData, setIntrestData] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState(null);

  const [filteredGame, setFilteredGame] = useState(IntrestData);

  useEffect(() => {
    Api_Get_Games(true);
  }, []);

  const Api_Get_Games = (isLoad) => {
    setIsLoading(isLoad);

    // const formData = new FormData();
    // formData.append("mobile_number", mobile_number);

    ApiManager.get(GET_GAMES, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Games : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var allGames = response.data.data;
          let finalGames = allGames
            .map((el) => ({ ...el, image: el.asset_url + el.image }))
            // .reverse();
          setIntrestData(finalGames);
          setFilteredGame(finalGames);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Games Error ", err);
      });
  };


  const Api_Register = (isLoad) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("name", registerData?.name);
    formData.append("mobile_number", registerData?.mobile_number);
    formData.append("email", '');
    formData.append("gender", registerData?.gender)
    formData.append("dob", registerData?.dob);
    formData.append("location", registerData?.location);
    formData.append("latitude", registerData?.lat);
    formData.append("longitude", registerData?.long);
    formData.append("device_type", Platform.OS == 'android' ? 1 : 2);
    formData.append("token", "1234567890");
    if(registerData?.profile_image){
      // formData.append("profile_image", registerData?.name);
      formData.append('profile_image', {
        uri: registerData?.profile_image?.path,
        name: getFileNameFromPath(registerData?.profile_image?.path),
        type: registerData?.profile_image?.mime
      });
    }
    formData.append("game_selection", JSON.stringify(selectedList.map((el) => ({  game_id: el.game_id , level : el.level }))));

    ApiManager.post(REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Register : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          let data = response.data.data
          storeData(BEARER_TOKEN,data?.auth_token)
          storeData(USER_DATA,response.data.data,() => {
            dispatch(storeUserData(response.data.data))
            resetScreen("Dashboard")
          })
        } else {
          toast.show({
            description : response.data.message
          })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Register Error ", err);
      });
  };

  const SelectIntrest = (item, interest) => {
    console.log("ITEM :", interest);
    var selectedData = [...selectedList];

    let filter = selectedData.filter((x) => x.id === interest.id);
    if (filter.length) {
      let filter = selectedData.filter((x) => x.id != interest.id);
      selectedData = filter;
    } else {
      var finalInterest = interest;
      finalInterest["level"] = item.title;
      finalInterest["game_id"] = interest.id;
      selectedData.push(finalInterest);
    }
    console.log("====================================");
    console.log("selectedData", selectedData);
    console.log("====================================");
    setSelectedList(selectedData);

    setOpenChooseLevelModal(false);
    setSelectedInterest(null);
  };

  const checkExists = (item) => {
    let filter = selectedList.filter((x) => x.id == item.id);
    if (filter.length) {
      return true;
    } else {
      return false;
    }
  };
  const OnLetsPlayTap = () => {
    if(selectedList.length){
      Api_Register(true)
    }else{
      toast.show({
        description : "Please select at least 1 game"
      })
    }
    console.log("Register Data : ", registerData);
    console.log("selected list : ", selectedList);

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
            // contentContainerStyle={{
            //   flexDirection: "row",
            //   flexWrap: "wrap",
            //   // justifyContent:"center",
            // }}
            numColumns={4}
            columnWrapperStyle={{
              flex: 1,
              // justifyContent: "space-evenly",
            }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  marginVertical: 15,
                  justifyContent: "center",
                  flex: 1 / 4,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    var filterData = selectedList?.filter(
                      (x) => x?.id == item.id
                    );
                    
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
                    alignItems: "center",
                    padding: 15,
                    borderRadius: 50,
                    flex: 1,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 42,
                      height: 42,
                      tintColor: checkExists(item) == true ? white : primary,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_14,
                    color: black,
                    marginVertical: 5,
                    textAlign: "center",
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
          OnLetsPlayTap();
        }}
        style={[CommonStyle.mainBtnStyle, { margin: pixelSizeHorizontal(20) }]}
      >
        <Text style={CommonStyle.mainBtnText}>{Translate.t("lets_play")}</Text>
      </TouchableOpacity>

      <BottomModal
        isVisible={openChooseLevelModal}
        onClose={() => {
          setOpenChooseLevelModal(false);
          setSelectedInterest(null);
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
                  <Icon name={"circle"} size={10} color={item.color} />
                  <Text
                    style={[
                      CommonStyle.regularText,
                      { flex: 1, marginHorizontal: pixelSizeHorizontal(10) },
                    ]}
                  >
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
