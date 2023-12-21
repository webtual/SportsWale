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

export default function MySports() {
  const [selectedItem, setSelectedItem] = useState(1);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedItem === index;

    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          height: 30,
          borderWidth: 0.5,
          marginRight: 15,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: isSelected ? Colors.secondary : null,
          marginVertical: 10,
        }}
        onPress={() => setSelectedItem(index)}
      >
        <Icon
          name={"basketball"}
          size={16}
          color={isSelected ? Colors.white : Colors.black}
        />
        <Text
          style={[styles.menuItemText, isSelected && styles.selectedItemText]}
        >
          {item.SportName}
        </Text>
      </TouchableOpacity>
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
          <GamesCard styles={{ width: SCREEN_WIDTH / 1.1 }} bookMark={true} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuItemText: {
    color: Colors.black,
    paddingVertical: 5,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
    marginLeft: 5,
  },
  selectedItemText: {
    color: Colors.white,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
  },
});
