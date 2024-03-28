import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { FlatList, Input } from "native-base";
import HeaderView from "../../commonComponents/HeaderView";
import { SportInfo } from "../../constants/Sport";
import { Colors } from "../../constants/CustomeColor";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import MySports from "../../commonComponents/Activity/MySports";
import Recommended from "../../commonComponents/Activity/Recommended";
import Schedule from "../../commonComponents/Activity/Schedule";
import OtherSports from "../../commonComponents/Activity/OtherSports";

const Activity = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedItem === index;

    return (
      <TouchableOpacity
        style={{ paddingRight: 20, paddingVertical: 10 }}
        onPress={() => setSelectedItem(index)}
      >
        <Text
          style={[styles.menuItemText, isSelected && styles.selectedItemText]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 0:
        return <Schedule />;
      case 1:
        return <Recommended />;
      case 2:
        return <MySports />;
      case 3:
        return <OtherSports />;
      default:
        return null;
    }
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title="Activity"
        isBack={false}
        containerStyle={{ flex: 1 }}
        titleColor={Colors.white}
      >
        <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
          <FlatList
            data={SportInfo}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          {renderSelectedComponent()}
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  menuItemText: {
    color: Colors.black,
    paddingVertical: 5,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_13,
  },
  selectedItemText: {
    color: Colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_13,
  },
});

export default Activity;
