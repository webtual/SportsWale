import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
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

const PayJoin = (props) => {
  const toast = useToast();
  const { game_details } = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false);
  const [txtPlayersCount, setTxtPlayersCount] = useState(1);

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

  const btnPayTap = () => {};

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
