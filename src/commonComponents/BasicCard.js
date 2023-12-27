import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Colors } from "../constants/CustomeColor";

const BasicCard = ({ children, style, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, style]}>
        <ScrollView
          contentContainerStyle={styles.cardContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  cardContent: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    overflow: "scroll",
  },
});

export default BasicCard;
