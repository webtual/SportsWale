import React from 'react';
import { View, Text , StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Colors } from '../constants/CustomeColor';
import { SEMIBOLD , FontSize, BOLD, MEDIUM } from '../constants/Fonts';
import { black } from '../constants/Color';
import { RUPEE } from '../constants/ConstantKey';
import { pixelSizeHorizontal } from './ResponsiveScreen';

const CustomPrice = ({ label,labelStyle={}, iconName, iconSize = 19, iconColor = Colors.black , amount, amountStyle={} }) => {
  return (
    <View
          style={styles.priceContainer}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[{
                fontFamily: BOLD,
                fontSize: FontSize.FS_18, //iconName ? FontSize.FS_15 : FontSize.FS_13,
                color: black,
                marginRight: pixelSizeHorizontal(5),
              },{...labelStyle}]}
            >
              {label}
            </Text>
            <Icon name={iconName} size={iconSize} color={iconColor} />
          </View>
          <Text
            style={[{
              fontFamily: MEDIUM,
              fontSize: FontSize.FS_18, //iconName ? FontSize.FS_15 : FontSize.FS_13,
              color: black,
            },{...amountStyle}]}
          >
            {RUPEE} {amount}
          </Text>
        </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical:pixelSizeHorizontal(5)
  },
});

export default CustomPrice;
