import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_GAMES, GET_MY_SPORT_EVENTS, GET_OTHER_SPORT_EVENTS } from "../../constants/ApiUrl";
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

const OtherGamesList = ({setIsLoading}) => {
  const toast = useToast();

  const userReduxData = useSelector((state) => state.userRedux);

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const [CurrentLatitude, setCurrentLatitude] = useState(
    userReduxData.lat || 0.0
  );
  const [CurrentLongitude, setCurrentLongitude] = useState(
    userReduxData.long || 0.0
  );

  const [allOtherGamesList, setAllOtherGamesList] = useState([]);


  useEffect(() => {
    console.log("OtherGamesList effect call");

    Api_GetOtherGamesList(true, {
      lat: CurrentLatitude,
      long: CurrentLongitude,
    });
  }, [page]);

  const Api_GetOtherGamesList = (isLoad, locationCords) => {
    setIsLoading?.(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("latitude", locationCords.lat);
    formData.append("longitude", locationCords.long);

    ApiManager.post(GET_OTHER_SPORT_EVENTS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetOtherGamesList : ", JSON.stringify(response));
        setIsLoading?.(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [...allOtherGamesList, ...response.data.data.other_sport_events];
            setAllOtherGamesList(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [...allOtherGamesList, ...response.data.data.other_sport_events];
            setAllOtherGamesList(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading?.(false);
        console.error("Api_GetOtherGamesList Error ", err);
      });
  };

  return (
    <View style={{flex:1}}>
      <FlatList
        style={{ flex: 1 }}
        data={allOtherGamesList}
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
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
});

export default OtherGamesList