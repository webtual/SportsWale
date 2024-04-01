import React from 'react';

/**  Constant  */
import { navigationRef } from './RootNavigation';
import AppStack from './AppStacks';

/**  Third Party  */
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
// import FlashMessage from 'react-native-flash-message';
import { AlertNotificationRoot } from 'react-native-alert-notification';


function AppNavigator() {

	return (
		
		<NavigationContainer ref={navigationRef}>
			<AlertNotificationRoot>
			<AppStack />
			</AlertNotificationRoot>
			{/* <FlashMessage position="top" /> */}
		</NavigationContainer>
		
	)
}

export default AppNavigator;