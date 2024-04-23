import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { BOLD, FontSize, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import { black, dim_grey, white } from "../../constants/Color";
import moment from "moment";

const AllQuestions = (props) => {
  const { game_data } = props?.route?.params;

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={""}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.card,
              {
                marginVertical: pixelSizeHorizontal(20),
              },
              CommonStyle.shadow,
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.titletext, { flex: 1 }]}>
                Questions ({game_data?.questions.length})
              </Text>
            </View>

            <FlatList
              data={game_data?.questions}
              scrollEnabled={false}
              ListHeaderComponent={<View style={{height : widthPixel(12)}}/>}
              ListFooterComponent={<View style={{height : widthPixel(12)}}/>}
              ItemSeparatorComponent={<View style={{height : widthPixel(12)}}/>}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text style={[styles.questionText]}>
                      <Text style={{ fontFamily: SEMIBOLD }}>Q. </Text>
                      {item?.question}
                    </Text>
                    {item?.answer ? (
                      <Text
                        style={[
                          styles.questionText,
                          { marginTop: pixelSizeHorizontal(5) },
                        ]}
                      >
                        <Text style={{ fontFamily: SEMIBOLD }}>A.</Text>
                        {item?.answer}
                      </Text>
                    ) : null}
                    <Text
                      style={[
                        styles.questionText,
                        { textAlign: "right", color: dim_grey },
                      ]}
                    >
                      {moment
                        .utc(item?.created_at)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: FontSize.FS_18,
    fontFamily: BOLD,
    color: black,
  },
  card: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    padding: pixelSizeHorizontal(12),
  },
  questionText: {
    fontSize: FontSize.FS_12,
    fontFamily: REGULAR,
    color: black,
  },
});
export default AllQuestions;
