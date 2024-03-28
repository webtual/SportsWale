import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  black,
  light_grey,
  primary,
  primary_light,
  secondary,
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
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import IconButton from "../../commonComponents/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import HeaderView from "../../commonComponents/HeaderView";
import TextInputView from "../../commonComponents/TextInputView";
import Feather from "react-native-vector-icons/Feather";
import { useToast } from "native-base";
import { useDispatch } from "react-redux";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_GAMES } from "../../constants/ApiUrl";
import CommonStyle from "../../commonComponents/CommonStyle";
import LoadingView from "../../commonComponents/LoadingView";

const SelectSport = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { onSelectSport, selectedSport } = props?.route?.params ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(
    selectedSport ? [selectedSport] : []
  );
  const [txtSearch, setTxtSearch] = useState("");
  const [IntrestData, setIntrestData] = useState([]);
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
          let finalGames = allGames.map((el) => ({
            ...el,
            image: el.asset_url + el.image,
          }));
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

  const checkExists = (item) => {
    let filter = selectedList.filter((x) => x.id == item.id);
    if (filter.length) {
      return true;
    } else {
      return false;
    }
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

  const btnDoneTap = () => {
    if (selectedList.length) {
      onSelectSport?.(selectedList[0]);
      goBack();
    } else {
      toast.show({
        description: "Please select at'least 1 game",
      });
    }
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Select Sport"}
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
                      setSelectedList([item]);
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
          btnDoneTap();
        }}
        style={[CommonStyle.mainBtnStyle, { margin: pixelSizeHorizontal(20) }]}
      >
        <Text style={CommonStyle.mainBtnText}>{Translate.t("done")}</Text>
      </TouchableOpacity>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },

  btnLogin: {
    backgroundColor: primary,
    borderRadius: widthPixel(5),
    padding: pixelSizeHorizontal(10),
    alignItems: "center",
    justifyContent: "center",
    marginTop: pixelSizeHorizontal(30),
  },
  signInText: {
    fontSize: FontSize.FS_16,
    color: white,
    fontFamily: MEDIUM,
  },
});

export default SelectSport;
