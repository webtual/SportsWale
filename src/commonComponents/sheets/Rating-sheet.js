import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import StarRating from "react-native-star-rating";
import { Colors } from "../../constants/CustomeColor";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../ResponsiveScreen";
import CommonStyle from "../CommonStyle";
import { BOLD, FontSize, MEDIUM } from "../../constants/Fonts";
export default function RatingSheet({
  onRatingChange,
  onReviewChange,
  onPressRate,
  rating,
}) {
  return (
    <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: BOLD,
          fontSize: FontSize.FS_20,
          color: Colors.black,
          marginVertical: pixelSizeVertical(10),
        }}
      >
        Vista Sport Arena
      </Text>
      <StarRating
        fullStarColor={Colors.warning}
        disabled={false}
        maxStars={5}
        rating={rating}
        starSize={30}
        containerStyle={{ width: 200, alignSelf: "center" }}
        selectedStar={(rating) => {
          onRatingChange(rating);
        }}
      />

      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Write a review..."
          multiline
          numberOfLines={4}
          //   value={review}
          onChangeText={(text) => {
            onReviewChange(text);
          }}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.grey,
            padding: 8,
            marginTop: 5,
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressRate}
        style={styles.btn}
      >
        <Text style={CommonStyle.mainBtnText}>Rate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.black,
    padding: pixelSizeHorizontal(10),
    alignItems: "center",
    borderRadius: widthPixel(50),
    marginVertical: pixelSizeHorizontal(10),
    marginHorizontal: pixelSizeHorizontal(40),
  },
});
