// Import necessary modules and styles
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import { Colors } from '../../constants/CustomeColor';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";

const FilterSheet = ({ selectedFilter, handleFilterSelection }) => {
  return (
    <View
      style={{
        paddingHorizontal: pixelSizeHorizontal(30),
        paddingVertical: pixelSizeVertical(20),
      }}
    >
      <Text
        style={{
          fontFamily: SEMIBOLD,
          fontSize: FontSize.FS_16,
          color: Colors.black,
          marginBottom: 15,
        }}
      >
        Filter By
      </Text>

      <TouchableOpacity
        onPress={() => handleFilterSelection('popularity')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: SEMIBOLD,
            fontSize: FontSize.FS_15,
            color: Colors.black,
          }}
        >
          Popularity
        </Text>
        <Icon
          name={selectedFilter === 'popularity' ? 'radiobox-marked' : 'radiobox-blank'}
          size={24}
          color={Colors.dimGrey}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleFilterSelection('distance')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: SEMIBOLD,
            fontSize: FontSize.FS_15,
            color: Colors.black,
          }}
        >
          Filter by Distance
        </Text>
        <Icon
          name={selectedFilter === 'distance' ? 'radiobox-marked' : 'radiobox-blank'}
          size={24}
          color={Colors.dimGrey}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilterSheet;
