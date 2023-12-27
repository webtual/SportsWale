import React from 'react';
import { View, Text , StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Colors } from '../constants/CustomeColor';
import { SEMIBOLD , FontSize } from '../constants/Fonts';

const CustomPrice = ({ label, iconName, iconSize = 19, iconColor = Colors.black , amount }) => {
  return (
    <View
          style={styles.priceContainer}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: iconName ? FontSize.FS_15 : FontSize.FS_13,
                color: Colors.black,
                marginRight: 5,
              }}
            >
              {label}
            </Text>
            <Icon name={iconName} size={iconSize} color={iconColor} />
          </View>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: iconName ? FontSize.FS_15 : FontSize.FS_13,
              color: Colors.black,
            }}
          >
            INR {amount}
          </Text>
        </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical:8
  },
});

export default CustomPrice;
