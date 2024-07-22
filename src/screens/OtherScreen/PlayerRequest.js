import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import CommonStyle from "../../commonComponents/CommonStyle";
import { useSelector } from "react-redux";
import { user_data } from "../../redux/reducers/userReducer";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import { BOLD, FontSize, MEDIUM, REGULAR } from "../../constants/Fonts";
import { black, primary_light, secondary, white } from "../../constants/Color";
import Translate from "../../translation/Translate";
import { FlatList } from "native-base";

export default function PlayerRequest() {
  const userData = useSelector(user_data);

  const item = [
    {
      created_at: "2024-04-24T10:14:02.639Z",
      deleted_at: null,
      id: 49,
      name: "Tejaswini ",
      profile: "uploads/users/1713780611634-image.png",
      skill: "Intermediate",
      updated_at: "2024-04-24T10:14:02.639Z",
      user_id: 65,
    },
    {
      created_at: "2024-04-24T10:11:53.146Z",
      deleted_at: null,
      id: 48,
      name: "bhargav mistri",
      profile: "uploads/users/default.jpeg",
      skill: "Intermediate",
      updated_at: "2024-04-24T10:11:53.146Z",
      user_id: 68
     },
  ];

  return (
    <FlatList
      data={item}
      ListHeaderComponent={
        <View style={{ height: pixelSizeHorizontal(12) }} />
      }
      ListFooterComponent={
        <View style={{ height: pixelSizeHorizontal(12) }} />
      }
      ItemSeparatorComponent={
        <View style={{ height: pixelSizeHorizontal(5) }} />
      }
      renderItem={({ item, index }) => {
        return (
          <View style={CommonStyle.card}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={[
                  {
                    width: 48,
                    height: 48,
                    borderRadius: 48 / 2,
                    overflow: "hidden",
                  },
                ]}
              >
                <Image
                  style={{ flex: 1, resizeMode: "cover" }}
                  source={{
                    uri: userData?.asset_url + item?.profile,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: pixelSizeHorizontal(10),
                }}
              >
                <Text style={[styles.titleText]}>{item?.name}</Text>
                {item?.skill && (
                  <Text
                    style={[
                      styles.descriprionText,
                      { marginTop: pixelSizeHorizontal(2) },
                    ]}
                  >
                    {item?.skill}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                paddingTop: pixelSizeHorizontal(12),
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: secondary,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: BOLD,
                    fontSize: FontSize.FS_12,
                    color: white,
                    marginHorizontal: 5,
                  }}
                >
                  {Translate.t("accept")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: primary_light,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: BOLD,
                    fontSize: FontSize.FS_12,
                    color: black,
                    marginHorizontal: 5,
                  }}
                >
                  {Translate.t("reject")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: FontSize.FS_14,
    fontFamily: BOLD,
    color: black,
  },
  descriprionText: {
    fontSize: FontSize.FS_12,
    fontFamily: REGULAR,
    color: black,
  },
});
