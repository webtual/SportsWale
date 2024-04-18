import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import { useDispatch } from "react-redux";
import { useToast } from "native-base";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_GAMES } from "../../constants/ApiUrl";
import TextInputView from "../../commonComponents/TextInputView";
import Feather from "react-native-vector-icons/Feather";
import Translate from "../../translation/Translate";
import { FontSize, SEMIBOLD } from "../../constants/Fonts";
import {
  black,
  primary,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import LoadingView from "../../commonComponents/LoadingView";
import CommonStyle from "../../commonComponents/CommonStyle";
import { BottomModal } from "../../commonComponents/Popup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddSports = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { onSelectGames, addedGames } = props?.route?.params;


  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState( []);
  const [txtSearch, setTxtSearch] = useState("");
  const [openChooseLevelModal, setOpenChooseLevelModal] = useState(false);
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
  const [IntrestData, setIntrestData] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [filteredGame, setFilteredGame] = useState(IntrestData);

  useEffect(() => {

    Api_Get_Games(true);
    if(addedGames.length){
      console.log("addedGames : ",addedGames)
      let preAddedGames = addedGames.map((el) => ({
        ...el,
        id: el.game_id
      }));
      setSelectedList(preAddedGames)
    }

    
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


  const btnDoneTap = () =>{
    if(selectedList.length){
      
       console.log("selectedList : ",selectedList)

       onSelectGames?.(selectedList)
       goBack()
      }else{
        toast.show({
          description : "Please select at'least 1 game"
        })
      }
  }

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Select Your Sports"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(20) }}
            icon={<Feather name={"search"} size={20} color={secondary} />}
            onChangeText={(text) => onSearchGame(text)}
            value={txtSearch}
            placeholder={Translate.t("search_game")}
            clearButtonMode="while-editing"
          />

          <FlatList
            keyboardShouldPersistTaps={"always"}
            scrollEnabled={false}
            data={filteredGame}
            extraData={selectedList}
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
            btnDoneTap();
        }}
        style={[CommonStyle.mainBtnStyle, { margin: pixelSizeHorizontal(20) }]}
      >
        <Text style={CommonStyle.mainBtnText}>{Translate.t("done")}</Text>
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

export default AddSports;
