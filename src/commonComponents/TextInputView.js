import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { PhoneImg } from '../constants/Images'
import { pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM } from '../constants/Fonts'
import { black, dim_grey, greenPrimary, primary, seprator, warmGrey, white } from '../constants/Color'

const TextInputView = ({ value = "", imageSource, onChangeText, placeholder = "", editable = true, focuse = false, containerStyle = {}, ...props }) => {

    const [isFocused, setIsFocused] = useState(focuse)

    return (
        <View style={[{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: white,
            borderRadius: 8,
            paddingHorizontal: 14,
            
            borderWidth: 1,
            // borderColor:isFocused ? primary:dim_grey
        }, { ...containerStyle }]}>

            {imageSource &&
                <FastImage
                    source={imageSource}
                    style={{ width: widthPixel(15), height: widthPixel(15) }}
                    resizeMode={'contain'}
                />}

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                editable={editable}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    flex: 1, marginLeft: pixelSizeHorizontal(15), fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: editable ? black : warmGrey,
                    paddingVertical: pixelSizeHorizontal(7),
                }}
                {...props}
            />

        </View>

    )
}

export default TextInputView





