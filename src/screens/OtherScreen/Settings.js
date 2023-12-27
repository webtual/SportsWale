
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation'
import { Colors } from '../../constants/CustomeColor'


const Settings = () => {


    const btnLoginTap = () => {
        goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { marginHorizontal: pixelSizeHorizontal(20) }]}>
                <ScrollView style={{ flex:1 }} showsVerticalScrollIndicator={false}>
                  <Text style={{alignSelf:"center",justifyContent:"center",flexDirection:"row",alignItems:"center"}}>Home</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: Colors.white,
        justifyContent:"center"
    },
  
})

export default Settings