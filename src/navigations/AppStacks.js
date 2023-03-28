import React, { Component, useRef } from 'react';


/* Constants Files */
import translate from '../translation/Translate';
import { disableColor, greenPrimary, offWhite, primary, white, secondary_dark_grey, black } from '../constants/Color';
import { FontSize, SEMIBOLD } from '../constants/Fonts';


/* Third party */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'
// import Icon from 'react-native-vector-icons/Feather';



/* Screens */
import Splash from '../screens/Splash';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import OtpView from '../screens/OtpView';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Venue from '../screens/Venue';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import FastImage from 'react-native-fast-image';
import { FolderFillImg, FolderImg, HomeFillImg, HomeImg, SettingFillImg, SettingImg, UserFillImg, UserImg } from '../constants/Images';
import ChooseIntrest from '../screens/chooseIntrest';
import VenueDetail from '../screens/VenueDetail';

// import { cart_data } from '../redux/reducers/cartReducer';
// import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {

	return (
		<>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: primary,
					tabBarInactiveTintColor: secondary_dark_grey,
					tabBarStyle: { backgroundColor: white, borderTopColor: offWhite, },
					tabBarLabelStyle: { fontFamily: SEMIBOLD, fontSize: FontSize.FS_12, marginBottom: 5 },
					tabBarHideOnKeyboard: true,
					tabBarShowLabel: true
				}}
			>
				<Tab.Screen
					name={"Home"}
					component={Home}
					options={{
						tabBarLabel: "Home",
						tabBarIcon: ({ color, size, focused }) => (
							<Icon name={"home"} size={24} color={color} />
						),
					}}
				/>


				<Tab.Screen
					name={"Venue"}
					component={Venue}
					options={{
						tabBarLabel: "Venue",
						tabBarIcon: ({ color, size, focused }) => (
							<Icon name={"globe"} size={24} color={color} />
						),
					}}
				/>

				<Tab.Screen
					name={"Profile"}
					component={Profile}
					options={{
						tabBarShowLabel: true,
						tabBarLabel: "Profile",
						tabBarIcon: ({ color, size, focused }) => (
							<Icon name={"user"} size={24} color={color} />
						),
					}}
				/>


				{/* <Tab.Screen
					name={"Settings"}
					component={Settings}
					options={{
						tabBarLabel: "Settings",
						tabBarIcon: ({ color, size, focused }) => (

							<FastImage style={{ width: size, height: size, }}
								tintColor={color}
								resizeMode='contain'
								source={focused ? SettingFillImg : SettingImg}
							/>

						),
					}}
				/> */}
			</Tab.Navigator>
		</>
	);
}


function AppStacks() {
	return (
		<Stack.Navigator
			initialRouteName="Splash"
			screenOptions={{
				headerShown: false,
				gesturesEnabled: false,

			}}>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Intro" component={Intro} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="OtpView" component={OtpView} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Dashboard" component={HomeTabs} />
			<Stack.Screen name="ChooseIntrest" component={ChooseIntrest} />
			<Stack.Screen name="VenueDetail" component={VenueDetail} />
		</Stack.Navigator>
	)
}


export default AppStacks;






// import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
// import React from 'react'
// import { black, light_grey, primary, warmGrey, white } from '../constants/Color'

// import Translate from '../translation/Translate'
// import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
// import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
// import { navigate } from '../navigations/RootNavigation'
// import IconButton from '../commonComponents/IconButton'
// import Icon from 'react-native-vector-icons/Feather'
// const ChooseIntrest = () => {



//   return (
//     <SafeAreaView style={styles.container}>
//         <View style={[styles.container,{marginHorizontal : pixelSizeHorizontal(24)}]}>

//                 <ScrollView style={{flex : 1}}>

//                 <View style={{flexDirection:"row",alignItems:"center", marginTop : pixelSizeHorizontal(20) }}>
//                   <IconButton 
//                         additionalStyle={{ marginLeft: pixelSizeHorizontal(-10),}}
//                         onPress={() => goBack()}>
//                         <Icon name={"arrow-left"} size={24} color={black} />
//                     </IconButton>
//                     <Text style={{fontFamily:BOLD,fontSize:FontSize.FS_22,color:black}}>Choose intrest  <Text style={{ color: primary }}>{Translate.t("app_name")}</Text></Text>
//                   </View>

//             <TouchableOpacity onPress={() => navigate("OtpView")} style={styles.btnLogin}>
//                 <Text style={styles.signInText}>Next</Text>
//             </TouchableOpacity>

   

//             </ScrollView>
//         </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({ 

//     container : {
//         flex : 1, backgroundColor: white
//     },

//     btnLogin : {
//         backgroundColor : primary,
//         borderRadius : widthPixel(5),
//         padding : pixelSizeHorizontal(10),
//         alignItems : 'center',
//         justifyContent : 'center',
//         marginTop : pixelSizeHorizontal(30)
//     },
//     signInText : {
//         fontSize : FontSize.FS_16,
//         color : white,
//         fontFamily : MEDIUM,
//     }

// })

// export default ChooseIntrest
