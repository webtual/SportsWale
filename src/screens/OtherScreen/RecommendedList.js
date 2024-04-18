import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommonStyle from "../../commonComponents/CommonStyle";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { dim_grey, secondary, white } from "../../constants/Color";
import { Input, useToast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { user_data } from "../../redux/reducers/userReducer";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_RECOMMENDED_GAME } from "../../constants/ApiUrl";
import { getUniqueListBy } from "../../commonComponents/Utils";
import { FontSize, SEMIBOLD } from "../../constants/Fonts";
import GamesCard from "../../commonComponents/GamesCard";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";

const RecommendedList = ({ setIsLoading }) => {
  const toast = useToast();
  const userData = useSelector(user_data);
  const userReduxData = useSelector((state) => state.userRedux);

  const [page, setPage] = useState(1);

  const [allRecommendedList, setAllRecommendedList] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [CurrentLatitude, setCurrentLatitude] = useState(
    userReduxData.lat || 0.0
  );
  const [CurrentLongitude, setCurrentLongitude] = useState(
    userReduxData.long || 0.0
  );

  useEffect(() => {
    console.log("Recommended effect call");

    Api_GetRecommendedList(true, {
      lat: userReduxData?.lat,
      long: userReduxData?.long,
    });
  }, [page]);

  useEffect(() => {
    console.log("Recommended userReduxData effect call");

    setAllRecommendedList([])
    setPage(1)
    setTimeout(() => {
      Api_GetRecommendedList(true, {
        lat: userReduxData?.lat,
        long: userReduxData?.long,
      });
    }, 1500);
  
  }, [userReduxData]);

  const Api_GetRecommendedList = (isLoad, locationCords) => {
    setIsLoading?.(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("latitude", locationCords.lat);
    formData.append("longitude", locationCords.long);

    ApiManager.post(GET_RECOMMENDED_GAME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetRecommendedList : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allRecommendedList,
              ...response.data.data.recommended_events,
            ];
            setAllRecommendedList(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allRecommendedList,
              ...response.data.data.recommended_events,
            ];
            setAllRecommendedList(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_GetRecommendedList Error ", err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={allRecommendedList}
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
  cardView: {
    backgroundColor: white,
    borderRadius: widthPixel(20),
    padding: pixelSizeHorizontal(12),
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
});
export default RecommendedList;
