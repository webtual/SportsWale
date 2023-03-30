
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, } from 'react-native'
import React, { useState } from 'react'
import { black, light_grey, primary, secondary, warmGrey, white } from '../constants/Color'

import Translate from '../translation/Translate'
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen'
import { goBack, navigate, resetScreen } from '../navigations/RootNavigation'
import IconButton from '../commonComponents/IconButton'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HStack, Radio, Stack } from 'native-base'
import AddModel from '../commonComponents/AddModel'

const Register = () => {
    const [value, setValue] = useState("one");
    const [isAddModal, setIsAddModal] = useState(false);
    const [selectedSportData, setSelectedSportData] = useState([]);

    const AddModal = () => {
        setIsAddModal(!isAddModal);
    };

    const deleteItem = (item) => {
        var newlist = [...selectedSportData]
        console.log("newlist", newlist)

        let filterData = newlist.filter(s => s.id !== item.id)
        console.log("filterData", filterData)
        setSelectedSportData(filterData)
    }

    const btnLoginTap = () => {
        goBack()
    }
    const btnSignUp = () => {

        navigate("OtpView", { isRegister: true })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { marginHorizontal: pixelSizeHorizontal(20) }]}>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>


                    <IconButton
                        additionalStyle={{ marginLeft: pixelSizeHorizontal(-10), marginTop: pixelSizeHorizontal(20) }}
                        onPress={() => goBack()}>
                        <Icon name={"arrow-left"} size={24} color={black} />
                    </IconButton>


                    <Text style={styles.headerText}>
                        Create an account in <Text style={{ color: primary }}>{Translate.t("app_name")}</Text>
                    </Text>


                    <View style={{ marginTop: pixelSizeHorizontal(30) }}>
                        <Text style={styles.titleText}>
                            First Name
                        </Text>
                        <TextInput
                            style={{ borderRadius: widthPixel(5), borderWidth: 2, borderColor: primary, padding: pixelSizeHorizontal(10), marginTop: pixelSizeHorizontal(10) }}
                            placeholder={"Enter first name"}
                        />

                    </View>

                    <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                        <Text style={styles.titleText}>
                            Last Name
                        </Text>
                        <TextInput
                            style={{ borderRadius: widthPixel(5), borderWidth: 2, borderColor: primary, padding: pixelSizeHorizontal(10), marginTop: pixelSizeHorizontal(10) }}
                            placeholder={"Enter last name"}
                        />
                    </View>

                    <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                        <Text style={styles.titleText}>
                            Phone number
                        </Text>
                        <TextInput
                            style={{ borderRadius: widthPixel(5), borderWidth: 2, borderColor: primary, padding: pixelSizeHorizontal(10), marginTop: pixelSizeHorizontal(10) }}
                            placeholder={"Enter phone number"}
                        />
                    </View>

                    <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                        <Text style={styles.titleText}>
                            Email Id ( Optional )
                        </Text>
                        <TextInput
                            style={{ borderRadius: widthPixel(5), borderWidth: 2, borderColor: primary, padding: pixelSizeHorizontal(10), marginTop: pixelSizeHorizontal(10) }}
                            placeholder={"Enter email id"}
                        />
                    </View>

                    <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                        <Text style={styles.titleText}>
                            Password
                        </Text>
                        <TextInput
                            style={{ borderRadius: widthPixel(5), borderWidth: 2, borderColor: primary, padding: pixelSizeHorizontal(10), marginTop: pixelSizeHorizontal(10) }}
                            placeholder={"Enter Password"}
                        />
                    </View>
                    <View style={{ marginTop: pixelSizeHorizontal(15) }}>
                        <Text style={[styles.titleText, { marginBottom: 5 }]}>
                            Gender
                        </Text>
                        <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
                            <Stack direction={{
                                base: "row",
                                md: "row"
                            }} alignItems={{
                                base: "flex-start",
                                md: "center"
                            }} space={5} >
                                <Radio value="1" colorScheme="warning" size="sm" my={1}>
                                    Male
                                </Radio>
                                <Radio value="2" colorScheme="warning" size="sm" my={1}>
                                    Female
                                </Radio>

                            </Stack>
                        </Radio.Group>

                    </View>

                    <Text style={[styles.titleText, { marginTop: 15, marginBottom: 10 }]}>
                        Select your intrested sport
                    </Text>

                    {selectedSportData && <FlatList style={{  }}
                        data={selectedSportData}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            alignSelf: "flex-start",
                            flexWrap: 'wrap'
                        }}
                        renderItem={({ item }) => (
                            <View 
                                style={{
                                    borderWidth:1,
                                    borderColor:primary,
                                    paddingHorizontal: 6,
                                    paddingVertical: 10,
                                    backgroundColor: secondary,
                                    padding: 10,
                                    marginHorizontal: 10,
                                    marginVertical:10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderRadius: 8,
                                }}>
                               
                                <Icon name={item.SportImage} size={24} color={primary} />

                                <Text style={{ fontFamily: REGULAR, fontSize: FontSize.FS_14, color: black, marginLeft: 5 }}>{item.SportName}</Text>
                                <TouchableOpacity onPress={() => { deleteItem(item) }}
                             style={{
                                 marginTop:2,
                                 marginHorizontal:10
                             }}>
                                 <Icon name={"close"} size={16} color={black} />

                             </TouchableOpacity>
                            </View>
                          
                        )}
                    />}


                    <TouchableOpacity onPress={() => AddModal()}
                        style={{
                            borderColor: primary,
                            borderWidth: 1,
                            borderRadius: widthPixel(5),
                            padding: pixelSizeHorizontal(10),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: FontSize.FS_16,
                            color: primary,
                            fontFamily: MEDIUM,
                        }}>Add intrest</Text>
                    </TouchableOpacity>


                    <Text style={styles.descText}>
                        By creating an account,i accept the <Text style={{ color: primary, fontFamily: SEMIBOLD }}> Terms & Conditions</Text>
                    </Text>


                    <TouchableOpacity onPress={() => btnSignUp()}
                        style={styles.btnLogin}>
                        <Text style={styles.signInText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'center', marginVertical: pixelSizeHorizontal(10) }}
                        onPress={() => btnLoginTap()}>
                        <Text style={[styles.textForgotPassword]}>Already have an account? Sign In</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
            <AddModel
            title={"Select Sport"}
                isAddVisible={isAddModal}
                toggleModel={() => AddModal()}
                selected_sport={selectedSportData}
                onAddVenue={(data) => {
                    console.log("selected data : ", data)
                    setSelectedSportData(data)
                }} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1, backgroundColor: white
    },
    headerText: {
        fontSize: FontSize.FS_22,
        color: black,
        fontFamily: SEMIBOLD,
        marginTop: pixelSizeHorizontal(20)
    },
    titleText: {
        fontSize: FontSize.FS_16,
        color: black,
        fontFamily: REGULAR,
    },
    textForgotPassword: {
        fontSize: FontSize.FS_14,
        color: primary,
        fontFamily: MEDIUM,
    },
    descText: {
        marginTop: pixelSizeHorizontal(30),
        fontSize: FontSize.FS_16,
        color: warmGrey,
        fontFamily: REGULAR,

    },
    btnLogin: {
        backgroundColor: primary,
        borderRadius: widthPixel(5),
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixelSizeHorizontal(30)
    },
    signInText: {
        fontSize: FontSize.FS_16,
        color: white,
        fontFamily: MEDIUM,
    }

})

export default Register