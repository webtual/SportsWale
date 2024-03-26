import React, { Component, useRef } from 'react';


/* Constants Files */
import translate from '../translation/Translate';
import { disableColor, greenPrimary, offWhite, primary, white, secondary_dark_grey, black, light_grey_02 } from '../constants/Color';
import { FontSize, REGULAR, SEMIBOLD } from '../constants/Fonts';


/* Third party */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon from 'react-native-vector-icons/Feather';



/* Screens */
import Splash from '../screens/AuthScreen/Splash';
import Intro from '../screens/AuthScreen/Intro';
import Login from '../screens/AuthScreen/Login';
import OtpView from '../screens/AuthScreen/OtpView';
// import Register from '../screens/AuthScreen/Register1';
import Home from '../screens/DashBoardScreen/Home';
import Venue from '../screens/DashBoardScreen/Venue';
import Profile from '../screens/DashBoardScreen/Profile';
import Settings from '../screens/OtherScreen/Settings';
import FastImage from 'react-native-fast-image';
import { FolderFillImg, FolderImg, HomeFillImg, HomeImg, SettingFillImg, SettingImg, UserFillImg, UserImg } from '../constants/Images';
import ChooseIntrest from '../screens/OtherScreen/chooseIntrest';
import VenueDetail from '../screens/OtherScreen/VenueDetail';
import AddVenue from '../screens/OtherScreen/AddVenue';
import Activity from '../screens/DashBoardScreen/Activity';
import CreateActivity from '../screens/OtherScreen/CreateActivity';
import ActivityDetails from '../screens/OtherScreen/ActivityDetails';
import Request from '../screens/OtherScreen/Request';
import RegisterName from '../screens/AuthScreen/RegisterName';
import RegisterMobile from '../screens/AuthScreen/RegisterMobile';
import RegisterUserDetails from '../screens/AuthScreen/RegisterUserDetail';
import RegisterSelectSport from '../screens/AuthScreen/RegisterSelectSport';
import RegisterWhatLearn from '../screens/AuthScreen/RegisterWhatLearn';
import RegisterFinal from '../screens/AuthScreen/RegisterFinal';
import RegisterWhatYouGain from '../screens/AuthScreen/RegisterWhatYouGain';
import { Select, View } from 'native-base';
import PopUp from '../commonComponents/Popup';
import { navigate } from './RootNavigation';
import EnterActivityName from '../screens/OtherScreen/EnterActivityName';
import EventType from '../screens/OtherScreen/EventType';
import SelectVenue from '../screens/OtherScreen/SelectVenue';
import SelectSlot from '../screens/OtherScreen/SelectSlot';
import EnterVenueName from '../screens/OtherScreen/EnterVenueName';
import SelectDateTime from '../screens/OtherScreen/SelectDateTime';
import InvitePeople from '../screens/OtherScreen/InvitePeople';
import Register from '../screens/AuthScreen/Register';
import Payment from '../screens/OtherScreen/Payment';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

import BookTab from '../screens/DashBoardScreen/BookTab';
import MenuTab from '../screens/DashBoardScreen/Menu';
import GamesTab from '../screens/DashBoardScreen/GamesTab';
import { SCREEN_WIDTH } from '../constants/ConstantKey';
import HomeIcon from '../assets/images/HomeIcon';
import UsersIcon from '../assets/images/UsersIcon';
import GroundIcon from '../assets/images/GroundIcon';
import MenuIcon from '../assets/images/MenuIcon';

// import { cart_data } from '../redux/reducers/cartReducer';
// import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {

	const _renderIcon = (routeName, selectedTab) => {
		switch (routeName) {
		  case 'Home':
			return (
			  <View style={styles.imgcontainer}>
				<HomeIcon color={routeName === selectedTab ? primary : light_grey_02}/>
				{/* <FastImage
				  source={Images.ICHome}
				  style={styles.image}
				  tintColor={
					routeName === selectedTab ? primary : light_grey_02
				  }
				/> */}
				<Text style={styles.text}>Home</Text>
			  </View>
			);
		  case 'Games':
			return (
			  <View style={styles.imgcontainer}>
				<UsersIcon color={routeName === selectedTab ? primary : light_grey_02}/>
				{/* <FastImage
				  source={Images.List}
				  style={styles.image}
				  tintColor={
					routeName === selectedTab ? primary : light_grey_02
				  }
				/> */}
				<Text style={styles.text}>Games</Text>
			  </View>
			);
		  case 'Book':
			return (
			  <View style={styles.imgcontainer}>
				<GroundIcon color={routeName === selectedTab ? primary : light_grey_02}/>
				{/* <FastImage
				  source={Images.Chat}
				  style={styles.image}
				  tintColor={
					routeName === selectedTab ? primary : light_grey_02
				  }
				/> */}
				<Text style={styles.text}>Book</Text>
			  </View>
			);
		  case 'Menu':
			return (
			  <View style={styles.imgcontainer}>
				<MenuIcon color={routeName === selectedTab ? primary : light_grey_02}/>
				{/* <FastImage
				  source={Images.Share}
				  style={styles.image}
				  tintColor={
					routeName === selectedTab ? primary : light_grey_02
				  }
				/> */}
				<Text style={styles.text}>Menu</Text>
			  </View>
			);
		}
	  };
	
	  const renderTabBar = ({routeName, selectedTab, navigate}) => {
		return (
		  <TouchableOpacity
			onPress={() => navigate(routeName)}
			style={styles.tabbarItem}>
			{_renderIcon(routeName, selectedTab)}
		  </TouchableOpacity>
		);
	  };

	return (
		<>
		  <CurvedBottomBar.Navigator
			type="DOWN"
			style={styles.bottomBar}
			shadowStyle={styles.shawdow}
			height={64}
			width={SCREEN_WIDTH}
			screenOptions={{headerShown: false}}
			circleWidth={50}
			bgColor={white}
			initialRouteName="Home"
			renderCircle={({selectedTab, navigate}) => (
			  <Animated.View style={styles.btnCircleUp}>
				<TouchableOpacity
				  style={styles.button}
				  onPress={() => {}}>
				  <Icon name="plus" color={white} size={35} />
				</TouchableOpacity>
			  </Animated.View>
			)}
			tabBar={renderTabBar}>
			<CurvedBottomBar.Screen
			  name="Home"
			  position="LEFT"
			  component={() => <Home />}
			/>
			<CurvedBottomBar.Screen
			  name="Games"
			  component={() => <GamesTab />}
			  position="LEFT"
			/>
			<CurvedBottomBar.Screen
			  name="Book"
			  position="RIGHT"
			  component={() => <BookTab />}
			/>
			<CurvedBottomBar.Screen
			  name="Menu"
			  component={() => <MenuTab />}
			  position="RIGHT"
			/>
		  </CurvedBottomBar.Navigator>
		</>
	  );
	return (
		<>
			<Tab.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: true,
					tabBarActiveTintColor: primary,
					tabBarInactiveTintColor: "#A6A6A6",
					tabBarStyle: { backgroundColor: white, height:50,borderRadius:20,elevation:0 },
					tabBarLabelStyle: { fontFamily: SEMIBOLD, fontSize: FontSize.FS_12, marginBottom: 5, },
					tabBarHideOnKeyboard: true,
				}}
			>
				<Tab.Screen
					name={"Home"}	
					component={Home}
					options={{
						tabBarLabel: "Home",
						tabBarIcon: ({ color, size, focused }) => (
							<MaterialCommunityIcons name={"view-dashboard-outline"} size={24} color={color} />
						),
					}}
				/>



				<Tab.Screen
					name={"Activity"}
					component={Activity}
					options={{
						tabBarLabel: "Activity",
						tabBarIcon: ({ color, size, focused }) => (
							<MaterialCommunityIcons name={"text-box-outline"} size={24} color={color} />
						),
					}}
				/>




				<Tab.Screen
					name={"Activity"}
					children={() => <View/>}
					listeners={({navgation}) =>({
						tabPress: (event) => {
							event.preventDefault();
							console.log("ADD ICON")
							navigate("CreateActivity")
							// PopUp.current.open()
						}
					})}
					// component={Activity}
					options={{
						tabBarLabel: "Activity",
						tabBarIcon: ({ color, size, focused }) => (
							<View style={{
								position:"absolute",
								bottom:20,
								height:60,
								width:60,
								backgroundColor:primary,
								justifyContent:"center",
								alignItems:"center",
								borderRadius:50
							}}>
							<MaterialCommunityIcons name={"plus"} size={35} color={white} style={{alignSelf:"center"}}/>
						
							</View>
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

			<Stack.Screen name="RegisterName" component={RegisterName} />
			<Stack.Screen name="RegisterMobile" component={RegisterMobile} />
			<Stack.Screen name="RegisterUserDetails" component={RegisterUserDetails} />
			<Stack.Screen name="RegisterSelectSport" component={RegisterSelectSport} />

			<Stack.Screen name="RegisterWhatLearn" component={RegisterWhatLearn} />
			<Stack.Screen name="RegisterWhatYouGain" component={RegisterWhatYouGain} />
			<Stack.Screen name="RegisterFinal" component={RegisterFinal} />
			<Stack.Screen name="EnterActivityName" component={EnterActivityName} />
			<Stack.Screen name="EventType" component={EventType} />
			<Stack.Screen name="SelectVenue" component={SelectVenue} />
			<Stack.Screen name="SelectSlot" component={SelectSlot} />
			<Stack.Screen name="EnterVenueName" component={EnterVenueName} />
			<Stack.Screen name="SelectDateTime" component={SelectDateTime} />
			<Stack.Screen name="InvitePeople" component={InvitePeople} />

			<Stack.Screen name="Dashboard" component={HomeTabs} />
			<Stack.Screen name="ChooseIntrest" component={ChooseIntrest} />
			<Stack.Screen name="VenueDetail" component={VenueDetail} />
			<Stack.Screen name="AddVenue" component={AddVenue} />
			<Stack.Screen name="CreateActivity" component={CreateActivity} />
			<Stack.Screen name="ActivityDetails" component={ActivityDetails} />
			<Stack.Screen name="Request" component={Request} />
			<Stack.Screen name="Payment" component={Payment} />
		</Stack.Navigator>
	)
}


export default AppStacks;


export const styles = StyleSheet.create({
	shawdow: {
	  shadowColor: '#DDDDDD',
	  shadowOffset: {
		width: 0,
		height: 0,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 5,
	},
	button: {
	  flex: 1,
	  justifyContent: 'center',
	},
	bottomBar: {
	  flex: 1,
	  justifyContent: 'space-around',
	},
	btnCircleUp: {
	  width: 60,
	  height: 60,
	  borderRadius: 30,
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: primary,
	  bottom: 28,
	  shadowColor: black,
	  shadowOffset: {
		width: 0,
		height: 1,
	  },
	  shadowOpacity: 0.2,
	  shadowRadius: 1.41,
	  elevation: 1,
	},
	tabbarItem: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	imgcontainer: {
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	image: {
	  width: 25,
	  height: 25,
	},
	text: {
	  fontFamily: SEMIBOLD,
	  fontSize: FontSize.FS_10,
	  marginTop: 2,
	},
  });
  