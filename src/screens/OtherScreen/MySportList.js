import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_GAMES, GET_MY_SPORT_EVENTS } from "../../constants/ApiUrl";
import { Input, useToast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import SportItem from "../../commonComponents/SportItem";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { getUniqueListBy } from "../../commonComponents/Utils";
import GamesCard from "../../commonComponents/GamesCard";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import { FontSize, SEMIBOLD } from "../../constants/Fonts";
import { dim_grey, secondary } from "../../constants/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MySportList = ({ setIsLoading }) => {
  const toast = useToast();

  const [allGames, setGames] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);

  const [allSportGames, setAllSportGames] = useState([]);

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    Api_Get_Games(true);
  }, []);

  useEffect(() => {
    if(selectedSport){
      Api_GetMySportEventList(true);
    }
  }, [selectedSport]);

  const Api_Get_Games = (isLoad) => {
    setIsLoading?.(isLoad);

    // const formData = new FormData();
    // formData.append("mobile_number", mobile_number);

    ApiManager.get(GET_GAMES, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Games : ", JSON.stringify(response));
        setIsLoading?.(false);

        if (response.data.status === true) {
          var allGames = response.data.data;
          let finalGames = allGames.map((el) => ({
            ...el,
            game_image: el.image,
            game_title: el.title,
          }));
          // .reverse();

          setSelectedSport(finalGames?.[0]);
          setGames(finalGames);
         
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading?.(false);
        console.error("Api_Get_Games Error ", err);
      });
  };

  const Api_GetMySportEventList = (isLoad) => {
    setIsLoading?.(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("game_id", selectedSport?.id);

    ApiManager.post(GET_MY_SPORT_EVENTS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetMySportEventList : ", JSON.stringify(response));
        setIsLoading?.(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [...allSportGames, ...response.data.data.my_sports];
            setAllSportGames(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [...allSportGames, ...response.data.data.my_sports];
            setAllSportGames(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading?.(false);
        console.error("Api_GetMySportEventList Error ", err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ marginTop: pixelSizeHorizontal(10) }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={allGames}
        ListFooterComponent={
          <View style={{ width: pixelSizeHorizontal(20) }}></View>
        }
        ListHeaderComponent={
          <View style={{ width: pixelSizeHorizontal(20) }}></View>
        }
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
                setPage(1);
                setAllSportGames([]);
              }}
            />
          );
        }}
      />

      <FlatList
        style={{ flex: 1 }}
        data={allSportGames}
        scrollEnabled
        nestedScrollEnabled={true}
        // extraData={props}
        ListHeaderComponent={() => <View style={{ height: widthPixel(12) }} />}
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
        renderItem={({ item }) => (
          <GamesCard
            cardStyles={{ width: SCREEN_WIDTH - 40 }}
            item={item}
            bookMark={false}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
});

export default MySportList;
