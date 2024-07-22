import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { FontSize, SEMIBOLD } from "../../constants/Fonts";
import { useToast } from "native-base";
import { getUniqueListBy } from "../../commonComponents/Utils";
import LoadingView from "../../commonComponents/LoadingView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { dim_grey, secondary } from "../../constants/Color";
import ApiManager from "../../commonComponents/ApiManager";
import { FAQ } from "../../constants/ApiUrl";
import Divider from "../../commonComponents/Divider";

const HelpSupport = (props) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [arrFaq, setArrFaq] = useState([]);

  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);
  const [Description_expanded, setDescription_expanded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    Api_GetFaq(true);
    Description_changeLayout(0);
  }, []);

  useEffect(() => {
    Api_GetFaq(true);
  }, [page]);

  const Api_GetFaq = (isLoad) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");

    ApiManager.post(FAQ, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetFaq : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [...arrFaq, ...response.data.data.faqs];
            setArrFaq(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [...arrFaq, ...response.data.data.faqs];
            setArrFaq(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_GetFaq Error ", err);
      });
  };

  const Description_changeLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (index == questionIndex) {
      setDescription_expanded(!Description_expanded);
    } else {
      setDescription_expanded(true);
    }
    setQuestionIndex(index);
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Help & Support"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              CommonStyle.titleText,
              { fontSize: FontSize.FS_18, marginTop: pixelSizeHorizontal(20) },
            ]}
          >
            FAQ
          </Text>

          <FlatList
            data={arrFaq}
            extraData={props}
            ListHeaderComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
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
                <View style={{ height: widthPixel(12) }} />
              )
            }
            ItemSeparatorComponent={() => (
              <Divider style={{marginVertical : pixelSizeHorizontal(10)}}/>
            )}
            ListEmptyComponent={() => (
             !isLoading ? <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: pixelSizeHorizontal(30),
                }}
              >
                <Text style={[styles.text, { color: dim_grey }]}>
                  No record found
                </Text>
              </View> : null
            )}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  onPress={() => Description_changeLayout(index)}
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      CommonStyle.oneLinerText,
                      {
                        color: dim_grey,
                        flex: 1,
                      },
                    ]}
                  >
                    {item.question}
                  </Text>

                  <Icon
                    size={20}
                    color={dim_grey}
                    name={Description_expanded && questionIndex == index ? "chevron-up" : "chevron-down"}
                  />
                </TouchableOpacity>
                {questionIndex == index && (
                  <View
                    style={{
                      height: Description_expanded ? null : 0,
                      overflow: "hidden",
                      marginTop: Description_expanded
                        ? pixelSizeHorizontal(10)
                        : 0,
                    }}
                  >
                    <Text
                      style={[
                        CommonStyle.regularText,
                        {
                          color: dim_grey,
                          fontSize: FontSize.FS_12,
                          justifyContent: "center",
                          flex: 1,
                        },
                      ]}
                    >
                      {item.answer}
                    </Text>
                  </View>
                )}
              </View>
            )}
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
export default HelpSupport;
