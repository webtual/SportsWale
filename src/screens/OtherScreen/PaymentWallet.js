import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { RUPEE } from "../../constants/ConstantKey";
import { black, border, dim_grey, green, white } from "../../constants/Color";
import { FontSize } from "../../constants/Fonts";
import TextInputView from "../../commonComponents/TextInputView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PaymentWallet = () => {
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Payments & Wallet"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: pixelSizeHorizontal(12),
            }}
          >
            <Text style={[CommonStyle.modalHeaderText, { flex: 1 }]}>
              My Sports Wallet
            </Text>
            <Text style={[CommonStyle.modalHeaderText, { color: green }]}>
              {RUPEE}800
            </Text>
          </View>

          <Text
            style={[
              CommonStyle.titleText,
              { fontSize: FontSize.FS_14, marginTop: pixelSizeHorizontal(25) },
            ]}
          >
            Add money to wallet
          </Text>
          <TextInputView
            containerStyle={{
              marginTop: pixelSizeHorizontal(12),
              borderRadius: widthPixel(10),
              borderWidth: 0.5,
              borderColor: border,
              width: "70%",
            }}
            value=""
            maxLength={7}
            keyboardType="number-pad"
            placeholder={RUPEE + "0"}
            onChangeText={(text) => {}}
          />

          <TouchableOpacity
            style={[
              CommonStyle.mainBtnStyle,
              {
                marginHorizontal: pixelSizeHorizontal(20),
                marginVertical: pixelSizeHorizontal(20),
              },
            ]}
            onPress={() => {}}
          >
            <Text style={CommonStyle.mainBtnText}>Add money to Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardView,
              CommonStyle.shadow,
              { flexDirection: "row" },
            ]}
          >
            <Text
              style={[
                CommonStyle.modalHeaderText,
                { fontSize: FontSize.FS_14, flex: 1 },
              ]}
            >
              Transaction History
            </Text>
            <Icon name={"chevron-right"} size={25} color={dim_grey} />
          </TouchableOpacity>
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  cardView: {
    borderRadius: widthPixel(12),
    flexDirection: "row",
    backgroundColor: white,
    padding: pixelSizeHorizontal(15),
    alignItems: "center",
    marginTop: pixelSizeHorizontal(12),
  },
});

export default PaymentWallet;
