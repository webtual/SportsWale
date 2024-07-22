import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import React, { useState } from "react";
import {
  black,
  dim_grey,
  placeholderGrey,
  primary,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import BallsIcon from "../../assets/images/BallsIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BOLD, FontSize, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import LocationIcon from "../../assets/images/LocationIcon";
import CalendarIcon from "../../assets/images/CalendarIcon";
import IdeaIcon from "../../assets/images/IdeaIcon";
import ToggleSwitch from "toggle-switch-react-native";
import TextInputView from "../../commonComponents/TextInputView";
import { RUPEE } from "../../constants/ConstantKey";
import { useToast } from "native-base";
import { CenterModal } from "../../commonComponents/Popup";
import UserThumbsUpIcon from "../../assets/images/UserThumbsUpIcon";
import Slider from "@react-native-community/slider";

const CreateGame = () => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [gameSkillIsOn, setGameSkillIsOn] = useState(false);
  const [txtInstruction, setTxtInstuction] = useState("");
  const [txtCost, setTxtCost] = useState("");
  const [txtPlayers, setTxtPlayers] = useState("");
  const [selectedSport, setSelectedSport] = useState(null);

  const [isGameSuccessModal, setIsGameSuccessModal] = useState(false);
  const [gameLevel, setGameLevel] = useState(1)

  const btnSelectSportTap = () => {
    navigate("SelectSport", {
      selectedSport: selectedSport,
      onSelectSport: (sport) => {
        setSelectedSport(sport);
      },
    });
  };

  
  const btnSelectVenueTap = () => {
    navigate("SelectVenue");
  };
  const btnSelectDateTap = () => {
    navigate("SelectSlot");
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title="Create Game"
        isBack={true}
        titleColor={white}
        onPress={() => goBack()}
      >
        <View
          style={{
            flex: 1,
            marginHorizontal: pixelSizeHorizontal(20),
          }}
        >
          <TouchableOpacity
            style={[styles.cardView, CommonStyle.shadow]}
            onPress={() => btnSelectSportTap()}
          >
            <BallsIcon />
            <View
              style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
            >
              <Text style={styles.cardTitle}>
                {selectedSport ? "Sport" : "Select Sport"}
              </Text>
              <Text
                style={[
                  styles.cardDescription,
                  { marginTop: pixelSizeHorizontal(4) },
                ]}
              >
                {selectedSport ? selectedSport.title : "Select Any Sport"}
              </Text>
            </View>
            <Icon name={"chevron-right"} size={24} color={dim_grey} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardView, CommonStyle.shadow]}
          onPress={btnSelectVenueTap}>
            <LocationIcon />
            <View
              style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
            >
              <Text style={styles.cardTitle}>Choose Venue/Location</Text>
              <Text
                style={[
                  styles.cardDescription,
                  { marginTop: pixelSizeHorizontal(4) },
                ]}
              >
                Venue / Location
              </Text>
            </View>
            <Icon name={"chevron-right"} size={24} color={dim_grey} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardView, CommonStyle.shadow]}
            onPress={() => btnSelectDateTap()}
          >
            <CalendarIcon />
            <View
              style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
            >
              <Text style={styles.cardTitle}>Select Date & Time</Text>
              <Text
                style={[
                  styles.cardDescription,
                  { marginTop: pixelSizeHorizontal(4) },
                ]}
              >
                Date / Time
              </Text>
            </View>
            <Icon name={"chevron-right"} size={24} color={dim_grey} />
          </TouchableOpacity>

          <View
            style={[
              styles.cardView,
              CommonStyle.shadow,
              { flexDirection: "column" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IdeaIcon />
              <View
                style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
              >
                <Text style={styles.cardTitle}>Game Skill</Text>
              </View>
              <ToggleSwitch
                isOn={gameSkillIsOn}
                onColor={secondary}
                offColor={placeholderGrey}
                size="medium"
                onToggle={(isOn) => {setGameSkillIsOn(isOn)
                setGameLevel(1)
                }}
              />
            </View>

            {gameSkillIsOn && (
              <>
                <Slider
                  style={{ flex: 1, width: "100%" }}
                  minimumValue={0}
                  maximumValue={3}
                  step={1}
                  lowerLimit={1}
                  value={gameLevel}
                  thumbTintColor={white}
                  minimumTrackTintColor={primary}
                  maximumTrackTintColor={primary_light}
                  onValueChange={setGameLevel}
                />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardDescription}>Beginner</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderRightWidth: 3,
                      borderLeftWidth: 3,
                      borderRightColor: primary_light,
                      borderLeftColor: primary_light,
                    }}
                  >
                    <Text style={styles.cardDescription}>Intermediate</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text style={styles.cardDescription}>Advance</Text>
                  </View>
                </View>
              </>
            )}
          </View>


          <Text
            style={[
              CommonStyle.inputTitle,
              { marginTop: pixelSizeHorizontal(12) },
            ]}
          >
            Total Player (Including Creator)
          </Text>
          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            onChangeText={(text) => {
              setTxtPlayers(text);
            }}
            value={txtPlayers}
            placeholder={"0"}
            keyboardType={"number-pad"}
            error={""}
          />

          <Text
            style={[
              CommonStyle.inputTitle,
              { marginTop: pixelSizeHorizontal(12) },
            ]}
          >
            Cost Per Player
          </Text>
          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            onChangeText={(text) => {
              setTxtCost(text);
            }}
            value={txtCost}
            placeholder={RUPEE + "0"}
            keyboardType={"number-pad"}
            error={""}
          />

        

          <Text
            style={[
              CommonStyle.inputTitle,
              { marginTop: pixelSizeHorizontal(12) },
            ]}
          >
            Instructions (optional)
          </Text>
          <TextInputView
            containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
            textFieldStyle={{ minHeight: widthPixel(100) }}
            onChangeText={(text) => {
              setTxtInstuction(text);
            }}
            value={txtInstruction}
            placeholder={"Instructions (optional)"}
            error={""}
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => {
             Keyboard.dismiss();
           }}
          />

          <TouchableOpacity
            // activeOpacity={1}
            onPress={() => {
              // setIsGameSuccessModal(true);
              navigate("Payment")
              
            }}
            style={[
              CommonStyle.mainBtnStyle,
              { marginVertical: pixelSizeHorizontal(50) },
            ]}
          >
            <Text style={CommonStyle.mainBtnText}>Create Game</Text>
          </TouchableOpacity>
        </View>
      </HeaderView>

      
    </>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    flexDirection: "row",
    padding: pixelSizeHorizontal(17),
    alignItems: "center",
    marginTop: pixelSizeHorizontal(12),
  },
  cardTitle: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_14,
    color: black,
  },
  cardDescription: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: dim_grey,
  },
});

export default CreateGame;
