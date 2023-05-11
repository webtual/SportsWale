import { View, Text, StyleSheet, Pressable, ScrollView ,TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import Translate from '../../translation/Translate'
import { heightPixel, pixelSizeHorizontal } from '../../commonComponents/ResponsiveScreen';
import HeaderView from '../../commonComponents/HeaderView'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation';
import { black, primary, secondary, seprator, warmGrey } from '../../constants/Color';
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CommonStyle from '../../commonComponents/CommonStyle'
import { Log } from '../../commonComponents/Log';

const OtpView = ({ route }) => {

	const [isRegister, setIsRegister] = useState(route?.params?.isRegister)
	const [optcode, setOptcode] = useState("")
	const [count, setCount] = useState(60)
	const [isResendCode, setIsResendCode] = useState(true)
	
	useEffect(() => {

	}, [])


	const btnSubmitTap = async () => {
		Log("IS FROM REGISTER :",isRegister)
		if (isRegister) {
		    navigate("RegisterUserDetails")
		}
		else {
		resetScreen("Dashboard")
		}
	}

	return (
		<HeaderView title={Translate.t("enter_otp")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.otpView}>
					<OTPInputView
						style={{ flex: 1, height: heightPixel(48) }}
						pinCount={4}
						code={optcode}
						onCodeChanged={code => { setOptcode(code) }}
						autoFocusOnLoad={true}
						codeInputFieldStyle={styles.borderStyleBase}
						codeInputHighlightStyle={styles.borderStyleHighLighted}
						onCodeFilled={(code) => {

							setOptcode(code)
							console.log(`Code is ${code}, you are good to go!`)
						}}
					/>
				</View>

				<Pressable
					onPress={() => btnSubmitTap()}
					style={CommonStyle.mainBtnStyle}>
					<Text style={CommonStyle.mainBtnText}>{!isRegister ? Translate.t("login"): Translate.t("submit")}</Text>

				</Pressable>

				<View style={{ alignSelf: 'center', marginTop: pixelSizeHorizontal(25) }}>
					<Text style={styles.textDesc}>
						{Translate.t("otp_desc")}
					</Text>
					{isResendCode ?
						<TouchableOpacity style={{ marginTop: pixelSizeHorizontal(12) }}
							onPress={() => { btnResendTap() }} >

							<Text style={styles.textResend}>
								{Translate.t("resend_otp")}
							</Text>

						</TouchableOpacity>
						:
						<Text style={[styles.textResend, { color: warmGrey, marginTop: pixelSizeHorizontal(10) }]}>
							Resend OTP in 00:{count}
						</Text>}
				</View>

			</ScrollView>
		</HeaderView>
	)
}

const styles = StyleSheet.create({
	textDesc: {
		color: warmGrey, fontFamily: MEDIUM, fontSize: FontSize.FS_16
	},
	textResend: {
		color: secondary, fontFamily: SEMIBOLD, fontSize: FontSize.FS_16,
		textAlign: 'center',
	},
	otpView: {
		alignItems: 'center',
		marginTop: pixelSizeHorizontal(60),
		marginBottom:10,
		marginHorizontal:pixelSizeHorizontal(40),
	},
	borderStyleBase: {
		borderWidth: 2,	
		borderColor: seprator,
		height: heightPixel(50),
		width: heightPixel(50),
		fontSize: FontSize.FS_22,
		fontFamily: REGULAR,
		borderRadius: 50,
		color: black,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: seprator,
		marginHorizontal: 5
	},
	borderStyleHighLighted: {
		borderColor: primary,
		fontSize: FontSize.FS_22,
		height: heightPixel(44),
		width: heightPixel(44),
		fontFamily: REGULAR,
		color: black,
		alignItems: 'center',
		justifyContent: 'center'
	},
})

export default OtpView