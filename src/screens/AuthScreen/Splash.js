//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, StatusBar, Platform, Alert, Linking } from 'react-native';

// Constants
import { black, dodgerBlue, greenPrimary, offWhite, primary, white } from '../../constants/Color'
import { navigate, resetScreen } from '../../navigations/RootNavigation'
import { BOLD, FontSize, MEDIUM, SEMIBOLD } from '../../constants/Fonts';
import { getData, storeData } from '../../commonComponents/AsyncManager';
import { BEARER_TOKEN, SCREEN_HEIGHT, SCREEN_WIDTH, USER_DATA } from '../../constants/ConstantKey';
import translate from '../../translation/Translate';
import ApiManager from '../../commonComponents/ApiManager';
import { name, version } from '../../../package.json'
import { VERSION_CHECK } from '../../constants/ApiUrl';
import { appLogoWhiteTrans, ImgLogo, SplashImg } from '../../constants/Images';

/** Redux Files */
import { useSelector, useDispatch } from 'react-redux'
import { storeUserData, user_data } from '../../redux/reducers/userReducer'
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../commonComponents/ResponsiveScreen';
import Translate from '../../translation/Translate';


// create a component
const Splash = (props) => {

	const [isLoading, setIsLoading] = useState(false)

	const userData = useSelector(state => state.userRedux.user_data)
	const dispatch = useDispatch()

	useEffect(() => {

		setTimeout(() => {
			// resetScreen('Login')
			GetUserData()
		}, 2500);
	}, [])

	/* Get User Data from Async Storage */
	const GetUserData = () => {

		getData(USER_DATA, (data) => {
			// console.log("USER_DATA Splash: " + JSON.stringify(data))
			if (data == null) {
				resetScreen('Intro')
			} else {
				storeData(BEARER_TOKEN,data?.auth_token)
				storeData(USER_DATA, data, () => {
					dispatch(storeUserData(data))
					resetScreen("Dashboard")
				})
			}
		})
	}


	return (
		<View style={styles.container}>
			<StatusBar barStyle={'dark-content'} backgroundColor={white} />
			<View style={{ flex: 1, backgroundColor: white, alignItems: 'center', justifyContent: 'center' }}>

				<Image
					source={appLogoWhiteTrans}
					style={{ width: SCREEN_WIDTH , height:SCREEN_HEIGHT, alignSelf: 'center', resizeMode : 'contain' }}
				/>
			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white
	},
	textView: {
		position: 'absolute', bottom: pixelSizeVertical(53), alignContent: 'flex-end',
		alignItems: 'center', left: 0, right: 0
	},
	textName: {
		fontFamily: BOLD, fontSize: FontSize.FS_24, color: white,
		marginHorizontal: pixelSizeHorizontal(20)
	},
	txtWebsite: {
		color: greenPrimary, fontFamily: BOLD, marginTop: pixelSizeHorizontal(20),
		marginHorizontal: pixelSizeHorizontal(20), fontSize: FontSize.FS_18,
	}
});

export default Splash;
