import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { PhoneImg } from '../constants/Images'
import { pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM } from '../constants/Fonts'
import { black, dim_grey, greenPrimary, light_grey, offWhite, primary, seprator, warmGrey, white } from '../constants/Color'
import CommonStyle from './CommonStyle'

const TextInputView = ({ value = "", imageSource, onChangeText, placeholder = "", editable = true, containerStyle = {}, ...props }) => {

    const [isFocused, setIsFocused] = useState(false)


    const onFocus = () => {
        setIsFocused(true)
        props?.onFocusEffect && props?.onFocusEffect()
    }

    const onBlur = () => {
        setIsFocused(false)
        props?.onBlurEffect && props?.onBlurEffect()
    }


    return (
        <>
        <View style={[{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: white,
            borderRadius: 8,
            paddingHorizontal: 14,
            borderWidth: 1.5,
            borderColor:isFocused ? primary:offWhite
        }, { ...containerStyle }]}>

            {imageSource &&
                <FastImage
                    source={imageSource}
                    style={{ width: widthPixel(15), height: widthPixel(15) }}
                    resizeMode={'contain'}
                />}

            <TextInput
            returnKeyType='none'
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={black}
                editable={editable}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{
                    flex: 1, marginLeft: pixelSizeHorizontal(15), fontFamily: MEDIUM, fontSize: FontSize.FS_16, color:  black,
                    paddingVertical: pixelSizeHorizontal(10),
                }}
                {...props}
            />

        </View>
        <Text style={CommonStyle.errorText}>{props.error}</Text>
        </>

    )
}

export default TextInputView





