import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import { black, greenPrimary, offWhite, primary, seprator, warmGrey, white } from '../constants/Color'
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from './ResponsiveScreen'
import { FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/ConstantKey'
import CommonStyle from './CommonStyle'


export const PopUp = ({ isVisible, toggleModel, popType = "", Point }) => {



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


export const BottomModal = ({
    title,
    containerStyle,
    isVisible,
    onClose,
    children,
    closeBtn = true,
  }) => {
    return (
      <Modal
        transparent={true}
        // animationType="slide"
        visible={isVisible}
        swipeDirection={undefined}
        style={[
          {
            margin: 0,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}
        deviceHeight={SCREEN_HEIGHT * 0.09}
        deviceWidth={SCREEN_WIDTH}
        backdropColor="rgba(0,0,0,0.5)"
        backdropOpacity={0.7}
        useNativeDriver={true}
        onBackdropPress={() => {
          onClose();
        }}
        onBackButtonPress={() => onClose()}>
        <View
          style={{
            maxHeight: SCREEN_HEIGHT * 0.9,
            // width: '100%',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: white,
          }}>
          <View>
            {title || closeBtn ? (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: white,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: seprator,
                  borderStyle: 'solid',
                  padding: 15,
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                }}>
                <Text
                  style={[
                    CommonStyle.modalHeaderText,
                    {
                      flex: 1,
                    },
                  ]}>
                  {title}
                </Text>
  
                {closeBtn && (
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      backgroundColor: white,
                      borderWidth: 1,
                      borderColor: seprator,
                      padding: 10,
                    }}
                    onPress={() => {
                      onClose?.();
                    }}>
                    <Icon
                      name={'window-close'}
                      size={20}
                      color={black}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
  
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {children}
          </ScrollView>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({

})

