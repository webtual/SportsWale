import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import ApiManager from "../../commonComponents/ApiManager";
import { TRANSACTION_HISTORY } from "../../constants/ApiUrl";
import { useToast } from "native-base";
import { useSelector } from "react-redux";
import { getUniqueListBy } from "../../commonComponents/Utils";
import LoadingView from "../../commonComponents/LoadingView";
import {
  black,
  dim_grey,
  primary_light,
  red,
  secondary,
} from "../../constants/Color";
import Icon from "react-native-vector-icons/Feather";
import { BOLD, FontSize, SEMIBOLD } from "../../constants/Fonts";
import CommonStyle from "../../commonComponents/CommonStyle";
import moment from "moment";
import Clock from "../../assets/images/Clock";

const TransactionHistory = () => {
  const toast = useToast();
  const userReduxData = useSelector((state) => state.userRedux);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [page, setPage] = useState(1);

  const [showMore, setShowMore] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  useEffect(() => {
    Api_GetTransactions_History(true);
  }, [page]);

  const Api_GetTransactions_History = (isLoad) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");

    ApiManager.post(TRANSACTION_HISTORY, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetTransactions_History : ", JSON.stringify(response));
        setIsLoading(false);
        setIsRefresh(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allTransaction,
              ...response.data.data.transactions,
            ];
            setAllTransaction(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allTransaction,
              ...response.data.data.transactions,
            ];
            setAllTransaction(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsRefresh(false);
        console.error("Api_GetTransactions_History Error ", err);
      });
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Transaction History"}
        isBack={true}
        onPress={() => goBack()}
        isRefreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true);
          // requestLocationPermission();

          Api_GetTransactions_History(true);
        }}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View
          style={{ marginTop: 10, flex: 1 }}
          onStartShouldSetResponder={() => true}
        >
          <FlatList
            contentContainerStyle={{ paddingBottom: 15 }}
            bounces={false}
            data={allTransaction}
            nestedScrollEnabled={true}
            onStartShouldSetResponder={() => true}
            ListHeaderComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            ListFooterComponent={() =>
              showMore && (
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
                <View
                  style={[
                    CommonStyle.card,
                    {
                      marginHorizontal: pixelSizeHorizontal(5),
                      flexDirection: "row",
                    },
                  ]}
                  onStartShouldSetResponder={() => true}
                >
                  <View
                    style={{
                      width: pixelSizeHorizontal(34),
                      height: pixelSizeHorizontal(34),
                      backgroundColor: primary_light,
                      borderRadius: pixelSizeHorizontal(34),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Clock />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: pixelSizeHorizontal(10),
                    }}
                  >
                    {info ? 
                    <Text
                      style={{
                        fontFamily: BOLD,
                        fontSize: FontSize.FS_14,
                        color: black,
                        flex: 1,
                      }}
                    >
                      {info?.venue_title} - {info?.game_title}
                    </Text> : null}
                    <Text
                      style={[
                        CommonStyle.smallText,
                        { flex: 1, marginVertical: info ? pixelSizeHorizontal(5) : 0 },
                      ]}
                    >
                      {moment(item?.created_at).format("DD MMM, YYYY")}
                    </Text>
                    <Text style={[CommonStyle.smallText, { flex: 1 }]}>
                      Transection Id : {item?.reference_number}
                    </Text>
                  </View>
                  <Text style={[CommonStyle.modalHeaderText, { color: red }]}>
                    - {item?.amount}
                  </Text>
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
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
});

export default TransactionHistory;
