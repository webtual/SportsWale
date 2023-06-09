import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Translate from '../../translation/Translate'
import { heightPixel, pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen';
import HeaderView from '../../commonComponents/HeaderView'
import { goBack, navigate, resetScreen } from '../../navigations/RootNavigation';
import { black, light_grey_02, offWhite, primary, secondary, seprator, warmGrey, white } from '../../constants/Color';
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
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../../redux/reducers/userReducer';

const RegisterUserDetails = ({ route }) => {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false);
	const [value, setValue] = useState("");
	const [BirthDate, setBirthDate] = useState("");
	const [Location, setLocation] = useState("");
	const [BirthDateErr, setBirthDateErr] = useState(""); 
	const [GenderErr, setGenderErr] = useState("");
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


	const profileData = useSelector((state) => state.userRedux.profile_data)



	useEffect(() => {
		Log("USER DETAILS SCREEN PROFILEDATA :", profileData)
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
		setBirthDateErr("")
		hideDatePicker();
	};
	const UserDeailsSchema = Yup.object().shape({
		location: Yup.string()
			.required("* Please enter your address"),
	});


	const userData = (data) => {
		setLocation(data?.location)
		if(BirthDate == "") {
			setBirthDateErr("* Please select Date of Birth(DOB).")
		}
		else if(value == "") {
			setGenderErr("* Please select gender.")
		}
		else{
			setGenderErr("")
			setBirthDateErr("]")

			var item = {...profileData}
			item.gender = value ? value : ""
			item.dob = BirthDate ? BirthDate : ""
			item.address = Location ? Location : ""
			item.country = "India"
			dispatch(setProfileData(value))
			navigate("RegisterSelectSport")
		}
	}


	return (
		<HeaderView title={Translate.t("location")} isBack={true} onPress={() => goBack()} containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20), }}>

			<ScrollView showsVerticalScrollIndicator={false}>
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
							<Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, marginBottom: pixelSizeHorizontal(10) }}>{Translate.t("address")}</Text>

							<TextInputView
								editable={true}
								imageSource={ic_location}
								onChangeText={handleChange('location')}
								// onBlurEffect={handleBlur('location')}
								value={values.location}
								placeholder={Translate.t("ente_address")}
								keyboardType={'default'}
								error={(errors.location && touched.location) && errors.location}
							/>
							<Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black,marginVertical: pixelSizeHorizontal(10), }}>{Translate.t("date_of_birth")}</Text>
							<TouchableOpacity onPress={() => { showDatePicker() }}
								style={{
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
									<Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: !BirthDate ?light_grey_02 : black, }}>{!BirthDate ? Translate.t("select") : moment(BirthDate).format("DD-MM-YY")}</Text>
								</View>
								

							</TouchableOpacity>
							<Text style={{
									fontFamily: REGULAR,
									fontSize: FontSize.FS_13,
									color: secondary,
									marginLeft: pixelSizeHorizontal(30)
								}}>{BirthDateErr ? BirthDateErr : ""}</Text>
							<Text style={{ fontFamily: SEMIBOLD, fontSize: FontSize.FS_18, color: black, marginVertical: pixelSizeHorizontal(10) }}>{Translate.t("gender")}</Text>
							<View style={{
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
									<Text style={{ fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: value !== "" ? black : light_grey_02, }}>{value !== "" ? value : Translate.t("select")}</Text>
								</TouchableOpacity>
							</View>

								<Text style={{
									fontFamily: REGULAR,
									fontSize: FontSize.FS_13,
									color: secondary,
									marginLeft: pixelSizeHorizontal(30)
								}}>{GenderErr}</Text>
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
								setGenderErr("")
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



