import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  black,
  dim_grey,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import { BOLD, FontSize, SEMIBOLD } from "../../constants/Fonts";
import { getUniqueListBy } from "../../commonComponents/Utils";
import { Input, useToast } from "native-base";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_SCHEDULE_GAME } from "../../constants/ApiUrl";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CommonStyle from "../../commonComponents/CommonStyle";
import FastImage from "react-native-fast-image";
import { user_data } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import NavigationIcon from "../../assets/images/NavigationIcon";
import moment from "moment";

const ScheduleList = ({ setIsLoading }) => {
  const toast = useToast();
  const userData = useSelector(user_data);

  const [type, setType] = useState("UPCOMING");

  const [page, setPage] = useState(1);

  const [allScheduleList, setAllScheduleList] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    console.log("Schedule effect call");

    Api_GetScheduleList(true);
  }, [page, type]);

  const Api_GetScheduleList = (isLoad) => {
    setIsLoading?.(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("type", type);

    ApiManager.post(GET_SCHEDULE_GAME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetScheduleList : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allScheduleList,
              ...response.data.data.schedule_events,
            ];
            setAllScheduleList(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allScheduleList,
              ...response.data.data.schedule_events,
            ];
            setAllScheduleList(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_GetScheduleList Error ", err);
      });
  };

  return (
    <View style={{ flex: 1,  }}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: pixelSizeHorizontal(20),
        }}
      >
        <TouchableOpacity
          style={[type == "UPCOMING" ? styles.btnSelected : styles.btn]}
          onPress={() => {
            setType("UPCOMING");
            setPage(1);
            setAllScheduleList([]);
          }}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: type == "UPCOMING" ? white : dim_grey,
              },
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            type == "PAST" ? styles.btnSelected : styles.btn,
            {
              marginHorizontal: pixelSizeHorizontal(10),
            },
          ]}
          onPress={() => {
            setType("PAST");
            setPage(1);
            setAllScheduleList([]);
          }}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: type == "PAST" ? white : dim_grey,
              },
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{flex:1}}
        data={allScheduleList}
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
          <View
            style={[
              styles.cardView,
              { marginHorizontal: pixelSizeHorizontal(20) },
              CommonStyle.shadow,
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <FastImage
                source={{ uri: userData?.asset_url + item?.game_image }}
                style={{
                  width: widthPixel(54),
                  height: widthPixel(54),
                  borderRadius: widthPixel(54),
                }}
              />
              <View style={{ marginLeft: pixelSizeHorizontal(16), flex: 1 }}>
                <Text style={styles.titleText}>{item?.venue_title}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: pixelSizeHorizontal(6),
                  }}
                >
                  <NavigationIcon
                    width={widthPixel(20)}
                    height={widthPixel(20)}
                  />
                  <Text
                    style={[
                      CommonStyle.regularText,
                      {
                        fontSize: FontSize.FS_12,
                        marginLeft: pixelSizeHorizontal(5),
                        flex: 1,
                      },
                    ]}
                  >
                    {item?.venue_location}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: pixelSizeHorizontal(22),
                flex: 1,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: primary_light,
                  borderRadius: widthPixel(5),
                  padding: pixelSizeHorizontal(7),
                }}
              >
                <Text style={[styles.descriptionText, {}]}>
                  {moment(item?.event_date).format("ddd, DD MMM, YYYY")}
                </Text>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: primary_light,
                  borderRadius: widthPixel(5),
                  padding: pixelSizeHorizontal(7),
                  marginLeft: pixelSizeHorizontal(10),
                }}
              >
                <Text style={[styles.descriptionText, {}]}>
                  {item?.display_event_start_time} to {item?.display_event_end_time}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: pixelSizeHorizontal(16),
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={[styles.descriptionText, { flex: undefined }]}>
                  • {item?.is_public ? "Public" : "Private"}
                </Text>

                <Text
                  style={[
                    styles.descriptionText,
                    { marginLeft: pixelSizeHorizontal(16), flex: undefined },
                  ]}
                >
                  • {item?.game_skill_level}
                </Text>
              </View>

              <Text
                style={[
                  styles.descriptionText,
                  {
                    textAlign: "center",
                    alignSelf: "flex-end",
                    flex: undefined,
                  },
                ]}
              >
                {item?.total_join_players + "\nGoing"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnSelected: {
    borderRadius: widthPixel(5),
    marginVertical: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(12),
    backgroundColor: secondary,
    minWidth: widthPixel(100),
  },
  btn: {
    borderRadius: widthPixel(5),
    marginVertical: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeHorizontal(8),
    paddingHorizontal: pixelSizeHorizontal(12),
    borderWidth: 1,
    borderColor: dim_grey,
    minWidth: widthPixel(100),
  },
  btnText: {
    color: white,
    textAlign: "center",
    fontFamily: BOLD,
    fontSize: FontSize.FS_12,
  },
  cardView: {
    backgroundColor: white,
    borderRadius: widthPixel(20),
    padding: pixelSizeHorizontal(12),
  },
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
  titleText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_16,
    color: black,
    flex: 1,
  },
  descriptionText: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: black,
    flex: 1,
  },
});
export default ScheduleList;
