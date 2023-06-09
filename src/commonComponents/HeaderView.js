import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView, ImageBackground, Image } from 'react-native'
import React from 'react'
import { black, greenPrimary, midGreen, offWhite, primary, secondary, transparent, warmGrey, white, yellow } from '../constants/Color'
import LinearGradient from 'react-native-linear-gradient'
import { heightPixel, pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import IconButton from './IconButton'
import FastImage from 'react-native-fast-image'
import { BackImg, headerBackground } from '../constants/Images'
import { BOLD, FontSize, SEMIBOLD } from '../constants/Fonts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/ConstantKey'

const HeaderView = ({ title = "", isBack = true, children, titleColor = white, onPress = {}, containerStyle = {}, rightComponent, ...props }) => {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: primary }}></SafeAreaView>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={'light-content'} backgroundColor={primary} />
                <ScrollView style={styles.container} contentContainerStyle={{}} bounces={false} keyboardShouldPersistTaps='handled'>
                    <View style={[styles.headerImgContainer,{ height: props.HeaderSmall ?SCREEN_WIDTH / 4 :SCREEN_WIDTH / 1.8,}]}>
                    <Image
                        source={headerBackground}
                        // resizeMode='cover'
                        style={{flex:1, borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,}}>
                        
                    </Image>
                    {title &&
                            <View style={styles.headerRowContainer}>
                                {isBack &&
                                    <IconButton additionalStyle={styles.btnBack}
                                        onPress={onPress}>
                                        <Icon name={"chevron-left"} size={32} color={titleColor} />
                                    </IconButton>}
                                <Text numberOfLines={1} style={[styles.textTitle, { color: titleColor, marginHorizontal: !isBack ? pixelSizeHorizontal(20) : pixelSizeHorizontal(5), fontSize: props.StackScreen?FontSize.FS_20: FontSize.FS_25, }]}>{title}</Text>

                                {rightComponent && rightComponent}
                            </View>
                        }
                    </View>
                   
                    <View style={[styles.mainView, { ...containerStyle }]}>
                        {children}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}



const styles = StyleSheet.create({
    headerRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: pixelSizeHorizontal(10),
        position: "absolute",
        bottom: pixelSizeHorizontal(20)
    },
    headerImgContainer: {
        width: SCREEN_WIDTH,
       
        backgroundColor: primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flex:1
    },
    container: {
        flex: 1,
        backgroundColor: offWhite,
    },
    textTitle: {
       
        fontFamily: SEMIBOLD,
        color: white,
    },
    btnBack: {
    },
    mainView: {
        width: "100%",  backgroundColor: offWhite,
    }
})


export default HeaderView