import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { black, greenPrimary, offWhite, primary, warmGrey, white } from '../constants/Color'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const PopUp = ({ isVisible, toggleModel, popType = "", Point }) => {



    return (
        <Modal isVisible={isVisible}
            onBackdropPress={() => toggleModel()}
            onBackButtonPress={() => toggleModel()}>

            <View style={{ backgroundColor: offWhite, borderRadius: widthPixel(15), padding: pixelSizeHorizontal(20), marginHorizontal: pixelSizeHorizontal(10),  }}>
              <TouchableOpacity onPress={() =>toggleModel()}
               style={{alignItems: "flex-end",marginBottom:10}}>
              <Icon  name={'close'} size={20} color={black}  />

              </TouchableOpacity>
                <View style={{alignItems: "center"}}>
                <Text style={{
                    fontSize: FontSize.FS_23,
                    color: popType == "sucess" ? primary :warmGrey,
                    fontFamily: REGULAR,
                }}>
                    {popType == "sucess" ? "Your request accepted" : "Your request rejected"}
                </Text>
                <Text style={{
                    fontSize: FontSize.FS_21,
                    color: warmGrey,
                    fontFamily: REGULAR,
                }}>
                    {popType == "sucess" ? "Player added to your team" : ""}
                </Text>

                <Icon name={popType == "sucess" ? "check-circle" : 'close-circle'} size={100} color={popType == "sucess" ? primary : warmGrey} />


                </View>
              
            </View>


        </Modal>
    )
}


const styles = StyleSheet.create({

})

export default PopUp