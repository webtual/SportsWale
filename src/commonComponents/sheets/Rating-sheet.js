import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
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
import { border, white, yellow } from "../../constants/Color";
import TextInputView from "../TextInputView";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
export default function RatingSheet({
  onRatingChange,
  onReviewChange,
  onPressRate,
  rating,
  review,
  isLoading
}) {
  return (
    <View style={{ padding: pixelSizeHorizontal(20) }}>
      <StarRating
        fullStarColor={yellow}
        disabled={false}
        maxStars={5}
        rating={rating}
        starSize={38}
        containerStyle={{ width: widthPixel(SCREEN_WIDTH-150), alignSelf: "center" }}
        selectedStar={(rating) => {
          onRatingChange(rating);
        }}
      />

      <View style={{ padding: 16 }}>

        <TextInputView 
        style={{minHeight : 100, backgroundColor : white,  borderColor: border,}}
         placeholder="Write a review (Optional)"
         multiline
         numberOfLines={4}
           value={review}
         onChangeText={(text) => {
           onReviewChange(text);
         }}
         blurOnSubmit={true}
         onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressRate}
        style={CommonStyle.mainBtnStyle}
      >
        {isLoading ? <ActivityIndicator size={'small'} color={white}/>:
        <Text style={CommonStyle.mainBtnText}>Rate</Text>}
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
