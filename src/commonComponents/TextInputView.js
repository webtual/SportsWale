import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { PhoneImg } from '../constants/Images'
import { pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM } from '../constants/Fonts'
import { black, dim_grey, greenPrimary, light_grey, offWhite, primary, seprator, warmGrey, white } from '../constants/Color'
import CommonStyle from './CommonStyle'

const TextInputView = ({ value = "", svgIcon, imageSource, onChangeText, placeholder = "", editable = true, containerStyle = {}, ...props }) => {

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
                paddingHorizontal: pixelSizeHorizontal(12),
                borderWidth: 1.5,
                borderColor: isFocused  ? primary : offWhite
            }, { ...containerStyle }]}>

                {imageSource &&
                    <FastImage
                        source={imageSource}
                        style={{ width: widthPixel(20), height: widthPixel(20) }}
                        resizeMode={'contain'}
                    />}
                    {svgIcon && svgIcon}

                <TextInput
                    returnKeyType='done'
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    // placeholderTextColor={black}
                    editable={editable}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={[CommonStyle.textInputStyle,{
                        flex: 1,
                        paddingVertical: pixelSizeHorizontal(10),
                    }, imageSource ||svgIcon && {marginHorizontal: pixelSizeHorizontal(12),}]}
                    {...props}
                />

            </View>
            {props.error ? 
            <Text style={[CommonStyle.errorText,{marginTop:pixelSizeHorizontal(3)}]}>{props.error}</Text>:null}
        </>

    )
}

export default TextInputView





