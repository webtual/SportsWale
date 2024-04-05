import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image'; // Import FastImage library
import { Colors } from '../constants/CustomeColor';
import { SEMIBOLD , FontSize} from '../constants/Fonts';
import { black } from '../constants/Color';
import { pixelSizeHorizontal } from './ResponsiveScreen';

const InfoItem = ({ iconSource, text, style={} }) => {
  return (
    <View
      style={[{
        flexDirection: 'row',
        marginVertical: pixelSizeHorizontal(7),
        // alignItems: 'center',
      },{...style}]}
    >
      {/* <FastImage
        style={{
          width: 28,
          height: 28,
        }}
        source={iconSource}
        resizeMode="cover"
      /> */}

      {iconSource && iconSource}
      <Text
        style={{
            fontFamily: SEMIBOLD,
            fontSize: FontSize.FS_16,
            color: black,
            marginLeft: pixelSizeHorizontal(10),
          }}
      >
        {text}
      </Text>
    </View>
  );
};

export default InfoItem;
