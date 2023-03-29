import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { black, greenPrimary, midGreen, offWhite, primary, secondary, transparent, warmGrey, white } from '../constants/Color'
import LinearGradient from 'react-native-linear-gradient'
import { heightPixel, pixelSizeHorizontal, widthPixel } from './ResponsiveScreen'
import IconButton from './IconButton'
import FastImage from 'react-native-fast-image'
import { BackImg } from '../constants/Images'
import { BOLD, FontSize, SEMIBOLD } from '../constants/Fonts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HeaderView = ({ title = "", isBack = true, children, titleColor = white, onPress = {}, containerStyle = {}, rightComponent, ...props }) => {
    return (
        <>
         <SafeAreaView style={{ flex: 0,  backgroundColor : primary }}></SafeAreaView>
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} backgroundColor={primary} />
            <ScrollView style={styles.container} contentContainerStyle={{}} bounces={false} keyboardShouldPersistTaps='handled'>
                {title &&
                    <View style={{
                        backgroundColor:primary,
                        flex: 1, flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: pixelSizeHorizontal(20),
                        borderBottomColor: secondary,
                        borderBottomWidth: 2
                    }}>
                        {isBack &&
                            <IconButton additionalStyle={styles.btnBack}
                                onPress={onPress}>
                                <Icon name={"arrow-left"} size={24} color={titleColor} />
                            </IconButton>}
                        <Text numberOfLines={1} style={[styles.textTitle, { color: titleColor, marginHorizontal: !isBack ? pixelSizeHorizontal(0) : pixelSizeHorizontal(10) }]}>{title}</Text>

                        {rightComponent && rightComponent}
                    </View>
                }
                <View style={[styles.mainView, { ...containerStyle }]}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        // backgroundColor: offWhite
    },
    textTitle: {
        marginVertical: 15,
        flex: 1,
        fontFamily: BOLD,
        fontSize: FontSize.FS_20,
        color: white,
    },
    btnBack: {
        marginLeft: pixelSizeHorizontal(-10),
    },
    mainView: {
        flex: 1, backgroundColor: white,
    }
})


export default HeaderView