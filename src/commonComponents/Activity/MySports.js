import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { PickSport } from "../../DummyData/Data";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/CustomeColor";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import { widthPixel, heightPixel , pixelSizeHorizontal} from "../ResponsiveScreen";
import { VenuesData } from "../../DummyData/Data";
import GamesCard from "../GamesCard";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import SportItem from "../SportItem";

export default function MySports() {
  const [selectedItem, setSelectedItem] = useState(1);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedItem === index;

    return (
      <SportItem
        item={item}
        index={index}
        isSelected={isSelected}
        onPressItem={(index) => setSelectedItem(index)}
        isDisabled={false}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={PickSport}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={VenuesData}
        ItemSeparatorComponent={() => (
          <View
            style={{ width: widthPixel(15), height: heightPixel(15) }}
          ></View>
        )}
        renderItem={({ item }) => (
          <GamesCard cardStyles={{ width: SCREEN_WIDTH / 1.1 }} bookMark={true} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
