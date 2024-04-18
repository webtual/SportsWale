import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate, popToTop, resetScreen } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import IconButton from "../../commonComponents/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BOLD, FontSize, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import { black, dim_grey, secondary, white } from "../../constants/Color";
import { RUPEE } from "../../constants/ConstantKey";
import Divider from "../../commonComponents/Divider";
import CommonStyle from "../../commonComponents/CommonStyle";
import { useToast } from "native-base";
import LoadingView from "../../commonComponents/LoadingView";
import ApiManager from "../../commonComponents/ApiManager";
import { JOIN_GAME } from "../../constants/ApiUrl";
import { CenterModal } from "../../commonComponents/Popup";
import UserThumbsUpIcon from "../../assets/images/UserThumbsUpIcon";

const PayJoin = (props) => {
  const toast = useToast();
  const { game_details } = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false);
  const [txtPlayersCount, setTxtPlayersCount] = useState(1);

  const [isGameSuccessModal, setIsGameSuccessModal] = useState(false);


  const Api_Join_Game = (isLoad) => {

    var convenienceCharge =
      (game_details?.cost_per_player_amount * txtPlayersCount) * parseFloat(game_details?.service_fees_percentage)/100;

      var totalAmount = (game_details?.cost_per_player_amount * txtPlayersCount)
      var totalPayableAmount = (totalAmount + convenienceCharge)

    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("venue_user_game_id", game_details?.id);
    formData.append("cost_per_player_amount", game_details?.cost_per_player_amount);
    formData.append("total_player", txtPlayersCount);
    formData.append("convenience_fees", convenienceCharge);
    formData.append("total_amount", totalAmount);
    formData.append("total_payable_amount", totalPayableAmount);
    formData.append("payment_ref_id", Date.now());
    formData.append("transaction_order_number", Date.now());

    ApiManager.post(JOIN_GAME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Join_Game : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          
          toast.show({
            description: response.data.message,
          });
          setIsGameSuccessModal(true);

        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Join_Game Error ", err);
      });
  };



  const btnMinusTap = () => {
    if (txtPlayersCount > 1) {
      setTxtPlayersCount(txtPlayersCount - 1);
    }
  };

  const btnPlusTap = () => {
    if (
      txtPlayersCount <
      game_details?.total_player - game_details?.total_join_players
    ) {
      setTxtPlayersCount(txtPlayersCount + 1);
    }
  };

  const btnPayTap = () => {
    var convenienceCharge =
    (game_details?.cost_per_player_amount * txtPlayersCount) * parseFloat(game_details?.service_fees_percentage)/100;

    var totalAmount = (game_details?.cost_per_player_amount * txtPlayersCount)
    var totalPayableAmount = (totalAmount + convenienceCharge)

    console.log("convenienceCharge : ",convenienceCharge)
    console.log("totalAmount : ",totalAmount)
    console.log("totalPayableAmount : ",totalPayableAmount)

    Api_Join_Game(true)
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Pay & Join"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        {game_details && (
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: pixelSizeHorizontal(20),
              }}
            >
              <Text style={[styles.detailText, { flex: 1 }]}>
                Amount Per Player
              </Text>
              <Text style={styles.detailText}>
                {RUPEE + game_details?.cost_per_player_amount}
              </Text>
            </View>

            <View
              style={[
                styles.card,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: pixelSizeHorizontal(20),
                },
              ]}
            >
              <Text style={[styles.detailText, { flex: 1 }]}>
                No. of Players
              </Text>
              <IconButton onPress={() => btnMinusTap()}>
                <Icon
                  name={"minus-circle-outline"}
                  size={24}
                  color={dim_grey}
                />
              </IconButton>
              <Text
                style={[
                  styles.detailText,
                  {
                    fontSize: FontSize.FS_20,
                    marginHorizontal: pixelSizeHorizontal(5),
                  },
                ]}
              >
                {txtPlayersCount}
              </Text>
              <IconButton onPress={() => btnPlusTap()}>
                <Icon
                  name={"plus-circle-outline"}
                  size={24}
                  color={secondary}
                />
              </IconButton>
            </View>

            <Divider />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: pixelSizeHorizontal(20),
              }}
            >
              <Text style={[styles.titleText, { flex: 1 }]}>Total Amount</Text>
              <Text style={styles.titleText}>
                {RUPEE + txtPlayersCount * game_details?.cost_per_player_amount}
              </Text>
            </View>

            <View
              style={[
                styles.card,
                {
                  marginBottom: pixelSizeHorizontal(20),
                },
              ]}
            >
              <Text style={[styles.titleText, { flex: 1 }]}>
                Cancellation Policy
              </Text>
              <Text
                style={[
                  styles.regularText,
                  { flex: 1, marginTop: pixelSizeHorizontal(10) },
                ]}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </Text>
            </View>
          </View>
        )}
      </HeaderView>

      <TouchableOpacity
        style={[
          CommonStyle.mainBtnStyle,
          {
            marginHorizontal: pixelSizeHorizontal(20),
            marginBottom: pixelSizeHorizontal(20),
          },
        ]}
        onPress={() => btnPayTap()}
      >
        <Text style={CommonStyle.mainBtnText}>
          Pay {RUPEE + txtPlayersCount * game_details?.cost_per_player_amount}
        </Text>
      </TouchableOpacity>

      <CenterModal
          isVisible={isGameSuccessModal}
          isCloseBtn={true}
          onClose={() => {
            setIsGameSuccessModal(false);
            
            setTimeout(() => {

              Promise.all([
                resetScreen("Dashboard")
                ]).then(() => navigate('BokingDetails'))

            }, 1000);
          }}
        >
          <View style={{ alignItems: "center" }}>
            <UserThumbsUpIcon />
            <Text
              style={{
                marginTop: pixelSizeHorizontal(12),
                textAlign: "center",
                fontFamily: BOLD,
                fontSize: FontSize.FS_18,
                color: black,
              }}
            >
              See you at the match!
            </Text>
            <Text
              style={{
                marginTop: pixelSizeHorizontal(12),
                textAlign: "center",
                fontFamily: REGULAR,
                fontSize: FontSize.FS_10,
                color: black,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy.
            </Text>
          </View>
        </CenterModal>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    padding: pixelSizeHorizontal(12),
  },
  titleText: {
    fontSize: FontSize.FS_16,
    color: black,
    fontFamily: BOLD,
  },
  detailText: {
    fontSize: FontSize.FS_16,
    color: black,
    fontFamily: SEMIBOLD,
  },
  regularText: {
    fontSize: FontSize.FS_12,
    color: black,
    fontFamily: REGULAR,
  },
});

export default PayJoin;
