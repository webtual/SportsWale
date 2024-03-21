import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Translate from '../../translation/Translate'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen';
import HeaderView from '../../commonComponents/HeaderView'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation';
import { black, offWhite, primary, secondary, seprator, warmGrey, white } from '../../constants/Color';
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../../constants/Fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CommonStyle from '../../commonComponents/CommonStyle'
import { Log } from '../../commonComponents/Log';
import { ic_calender, ic_location, ic_user } from '../../constants/Images';
import FastImage from 'react-native-fast-image';
import { Modal, Radio, Stack } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import TextInputView from '../../commonComponents/TextInputView';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterUserDetails = ({ route }) => {

	const [count, setCount] = useState(60)
	const [showModal, setShowModal] = useState(false);
	const [value, setValue] = useState("");
	const [BirthDate, setBirthDate] = useState(null);
	const [Location, setLocation] = useState("");
	const [BirthDateErr, setBirthDateErr] = useState("Please enter Date of Birth");
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	useEffect(() => {

	}, [])

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		console.warn("A date has been picked: ", typeof date);
		setBirthDate(date)
		hideDatePicker();
	};
	const UserDeailsSchema = Yup.object().shape({
		location: Yup.string()
			// .min(10, '* Please enter your name')
			.required("* Please enter your location"),
	});


	const userData = (data) => {
		setLocation(data)
		navigate("RegisterSelectSport")
	}


	return (
		<HeaderView title={Translate.t("location")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>

			<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
				{/* <View style={{
					marginTop: pixelSizeHorizontal(15),
					height: widthPixel(48),
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: white,
					borderRadius: 8,
					paddingHorizontal: 14,
				}}>
					<FastImage
						source={ic_location}
						style={{ width: widthPixel(15), height: widthPixel(15) }}
						resizeMode={'contain'}
					/>
					<View
						style={{
							flex: 1, marginLeft: pixelSizeHorizontal(15),
							paddingVertical: pixelSizeHorizontal(12),
						}}>
						<Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black, }}>{Translate.t("enter_location")}</Text>
					</View>
				</View> */}
				<Formik
					enableReinitialize
					initialValues={{
						location: Location,
					}}
					validationSchema={UserDeailsSchema}
					onSubmit={values => { userData(values) }
					}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
						<View style={{ marginTop: pixelSizeHorizontal(20) }}>
							<Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, marginBottom: pixelSizeHorizontal(15) }}>{Translate.t("location")}</Text>

							<TextInputView
								editable={true}
								imageSource={ic_location}
								onChangeText={handleChange('location')}
								// onBlurEffect={handleBlur('location')}
								value={values.location}
								placeholder={Translate.t("enter_location")}
								keyboardType={'default'}
								error={(errors.location && touched.location) && errors.location}
							/>
							<Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, }}>{Translate.t("date_of_birth")}</Text>
							<TouchableOpacity onPress={() => { showDatePicker() }}
								style={{
									marginTop: pixelSizeHorizontal(15),
									height: widthPixel(48),
									flexDirection: 'row',
									alignItems: 'center',
									backgroundColor: white,
									borderRadius: 8,
									paddingHorizontal: 14,
								}}>
								<FastImage
									source={ic_calender}
									style={{ width: widthPixel(15), height: widthPixel(15) }}
									resizeMode={'contain'}
								/>
								<View
									style={{
										flex: 1, marginLeft: pixelSizeHorizontal(15),
										paddingVertical: pixelSizeHorizontal(12),
									}}>
									<Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black, }}>{!BirthDate ? Translate.t("select") : moment(BirthDate).format("DD-MM-YY")}</Text>
								</View>
							</TouchableOpacity>
							<Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, marginTop: pixelSizeHorizontal(20) }}>{Translate.t("gender")}</Text>
							<View style={{
								marginTop: pixelSizeHorizontal(15),
								height: widthPixel(48),
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: white,
								borderRadius: 8,
								paddingHorizontal: 14,
							}}>
								<FastImage
									source={ic_user}
									style={{ width: widthPixel(15), height: widthPixel(15) }}
									resizeMode={'contain'}
								/>
								<TouchableOpacity onPress={() => setShowModal(true)}
									style={{
										flex: 1, marginLeft: pixelSizeHorizontal(15),
										paddingVertical: pixelSizeHorizontal(12),
									}}>
									<Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black, }}>{value !== "" ? value : Translate.t("select")}</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity activeOpacity={0.7}
								onPress={handleSubmit}
								style={CommonStyle.mainBtnStyle}>
								<Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>

							</TouchableOpacity>

						</View>
					)}
				</Formik>


			</ScrollView>
			<Modal isOpen={showModal} safeAreaTop={true} onClose={() => setShowModal(false)} size="lg">
				<Modal.Content maxWidth="100%" {...styles["bottom"]}>
					<Modal.CloseButton />
					<Modal.Header>Select Gender</Modal.Header>
					<Modal.Body>
						<Radio.Group value={value}
							onChange={nextValue => {
								setShowModal(false);
								setValue(nextValue);
							}}
							name="exampleGroup" defaultValue="male" accessibilityLabel="pick a size">
							<Stack direction={{
								base: "column",
								md: "row"
							}} alignItems={{
								base: "flex-start",
								md: "center"
							}} space={4} w="100%" maxW="300px">
								<Radio value="Male" colorScheme="red" size="md" my={1}>
									Male
								</Radio>
								<Radio value="Female" colorScheme="red" size="md" my={1}>
									Female
								</Radio>
								<Radio value="Other" colorScheme="red" size="md" my={1}>
									Other
								</Radio>
							</Stack>
						</Radio.Group>
					</Modal.Body>
				</Modal.Content>
			</Modal>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</HeaderView>
	)
}

const styles = StyleSheet.create({

})

export default RegisterUserDetails



