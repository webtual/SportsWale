
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { black, light_grey, primary, warmGrey, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'

import Icon from 'react-native-vector-icons/Feather'

const Profile = () => {


    const btnLoginTap = () => {
        goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { marginHorizontal: pixelSizeHorizontal(20) }]}>
                <ScrollView style={{ flex:1 }} showsVerticalScrollIndicator={false}>
                  <Text style={{alignSelf:"center",justifyContent:"center",flexDirection:"row",alignItems:"center"}}>Profile</Text>
                </ScrollView>
            </View>
        </SafeAreaView>          
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white,
        justifyContent:"center"
    },
  
})

export default Profile