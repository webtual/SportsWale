import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Image,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import IconButton from "../../commonComponents/IconButton";
import {
  black,
  border,
  error,
  offWhite,
  primary,
  primary_light,
  red,
  secondary,
  transparent,
  white,
} from "../../constants/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import { useToast, Menu } from "native-base";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import LoadingView from "../../commonComponents/LoadingView";
import ApiManager from "../../commonComponents/ApiManager";
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  GAME_DETAILS,
  UPDATE_QUESTION,
  CANCEL_GAME,
} from "../../constants/ApiUrl";
import moment from "moment";
import BasicCard from "../../commonComponents/BasicCard";
import CommonStyle from "../../commonComponents/CommonStyle";
import NavigationIcon from "../../assets/images/NavigationIcon";
import InfoItem from "../../commonComponents/InfoItem";
import TurfIcon from "../../assets/images/TurfIcon";
import { BottomModal } from "../../commonComponents/Popup";
import TextInputView from "../../commonComponents/TextInputView";
import QuestionList from "../../commonComponents/QuestionList";
import { DEEPLINK_TEST_URL } from "../../constants/ConstantKey";

const GameDetails = (props) => {
  const toast = useToast();

  const { game_data } = props?.route?.params;
  console.log("🚀 ~ GameDetails ~ game_data:", game_data)

  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [gameDetails, setGameDetails] = useState(null);
  const [isOpenQuestion, setOpenQuestion] = useState(false);
  const [txtQuestion, setTxtQuestion] = useState("");
  const [txtReply, setTxtReply] = useState("");
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [replyId, setReplyId] = useState(null);

  const [leaveType, setLeaveType] = useState("");
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [txtLeaveReason, setTxtLeaveReason] = useState("");

  useEffect(() => {
    Api_Get_Game_Details(true);
  }, []);

  const Api_Get_Game_Details = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("venue_user_game_id", game_data?.id);

    ApiManager.post(GAME_DETAILS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Game_Details : ", JSON.stringify(response));
        setIsLoading(false);
        setIsRefresh(false);

        if (response.data.status === true) {
          setGameDetails(response.data.data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsRefresh(false);

        console.error("Api_Get_Game_Details Error ", err);
      });
  };

  const Api_Add_Question = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("venue_user_game_id", game_data?.id);
    formData.append("venue_id", game_data?.venue_id);
    formData.append("question", txtQuestion);

    ApiManager.post(ADD_QUESTION, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Add_Question : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          toast.show({
            description: response.data.message,
          });
          setTxtQuestion("");
          setOpenQuestion(false);
          Api_Get_Game_Details(true);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Add_Question Error ", err);
      });
  };

  const Api_Leave_Game = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("transaction_id", gameDetails?.transactions?.id);
    formData.append("reason", txtLeaveReason);

    ApiManager.post(CANCEL_GAME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Leave_Game : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          toast.show({
            description: response.data.message,
          });
          setTxtLeaveReason("");
          setShowLeavePopup(false);
          // Api_Get_Game_Details(true);
          setTimeout(() => {
            goBack();
          }, 1000);
        } else {
          toast.show({
            description: response.data.message,
            placement: "top",
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Leave_Game Error ", err);
      });
  };

  const filterGameHost = () => {
    var host = gameDetails?.game_participants?.filter(
      (users) => users?.user_id == gameDetails?.user_id
    );
    return host?.[0] || null;
  };

  const btnJoinGameTap = () => {
    navigate("PayJoin", { game_details: gameDetails });
  };

  const btnShareTap = () => {
    if (gameDetails) {
      var link = `${DEEPLINK_TEST_URL}?game_id=${game_data?.id}&type=game_detail`;
      var message = `${filterGameHost()?.name} created ${
        gameDetails?.game_title
      } game on ${moment(gameDetails?.event_date).format("DD MMM, YYYY")} , ${
        gameDetails?.display_event_start_time
      } - ${gameDetails?.display_event_end_time} at ${
        gameDetails?.venue_title
      },\n\n you are invided for game play. please join game by clicking on below link.\n\n${link}`;

      const result = Share.share({
        title: "Sports Vale",
        message: message,
        // url: Platform.OS == 'ios' ? IOS_APP_LINK : ANDROID_APP_LINK
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    }
  };

  const Api_delete_question = (isLoad, questionId) => {
    setIsLoading(isLoad);
    ApiManager.delete(DELETE_QUESTION + questionId, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_delete_question : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          Api_Get_Game_Details(true);
          toast.show({
            description: response.data.message,
          });
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_delete_question Error ", err);
      });
  };

  const Api_update_question = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("answer", txtReply);

    ApiManager.put(UPDATE_QUESTION + replyId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_update_question : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setIsOpenReply(false);
          setReplyId(null);
          setTxtReply("");
          Api_Get_Game_Details(true);
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

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={""}
        isBack={true}
        onPress={() => goBack()}
        isRefreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true);
          Api_Get_Game_Details(true);
        }}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
        rightComponent={
          gameDetails && (
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <IconButton
                additionalStyle={{}}
                onPress={() => {
                  btnShareTap();
                }}
              >
                <Icon name={"share-variant"} size={24} color={white} />
              </IconButton>
              <Menu
                closeOnSelect={true}
                placement="bottom right"
                style={{}}
                onOpen={() => console.log("opened")}
                onClose={() => console.log("closed")}
                trigger={(triggerProps) => {
                  return (
                    <Pressable {...triggerProps} style={{ marginLeft: 15 }}>
                      {gameDetails?.allow_to_join == false &&
                      gameDetails?.cancelled_on == null &&
                      gameDetails?.is_finished == 0 ? (
                        <Icon name={"dots-vertical"} size={24} color={white} />
                      ) : null}
                    </Pressable>
                  );
                }}
              >
                <Menu.Item
                  _text={{
                    fontFamily: MEDIUM,
                    fontSize: FontSize.FS_14,
                    color: black,
                  }}
                  onPress={() => {
                    if (
                      (gameDetails?.transactions != null &&
                        gameDetails?.transactions != undefined) ||
                      gameDetails?.cancelled_on == null
                    ) {
                      navigate("BokingDetails", {
                        transactionId: gameDetails?.transactions?.id,
                      });
                    } else {
                      toast.show({
                        description:
                          "You need to join game first to view transaction receipt.",
                      });
                    }
                  }}
                >
                  View Receipt
                </Menu.Item>
                {filterGameHost()?.user_id == userData?.id &&
                gameDetails?.cancelled_on == null ? (
                  <Menu.Item
                    _text={{
                      fontFamily: MEDIUM,
                      fontSize: FontSize.FS_14,
                      color: black,
                    }}
                    onPress={() => {
                      setLeaveType("Cancel Game");
                      setShowLeavePopup(true);
                    }}
                  >
                    Cancel Game
                  </Menu.Item>
                ) : null}
              </Menu>
            </View>
          )
        }
      >
        {gameDetails && (
          <View style={{}}>
            {/* <Text
              style={[
                styles.titletext,
                {
                  fontSize: FontSize.FS_20,
                  marginTop: pixelSizeHorizontal(20),
                },
              ]}
            >
              {gameDetails?.game_title}
            </Text>

            <Text
              style={[
                {
                  fontSize: FontSize.FS_16,
                  fontFamily: MEDIUM,
                  color: black,
                  marginTop: pixelSizeHorizontal(12),
                },
              ]}
            >
              {moment(gameDetails?.event_date).format("DD MMM, YYYY")} |{" "}
              {gameDetails?.event_start_time} - {gameDetails?.event_end_time}
            </Text> */}

            <BasicCard style={{ marginVertical: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    tintColor: secondary,
                  }}
                  source={{
                    uri: userData?.asset_url + gameDetails?.game_image,
                  }}
                />
                <Text
                  style={{
                    fontFamily: BOLD,
                    fontSize: FontSize.FS_20,
                    color: black,
                    marginLeft: 10,
                  }}
                >
                  {gameDetails?.game_title}
                </Text>
              </View>

              <View style={{}}>
                <Text
                  style={{
                    fontFamily: MEDIUM,
                    fontSize: FontSize.FS_16,
                    color: black,
                  }}
                >
                  {moment(gameDetails?.event_date).format("DD MMM, YYYY")} |{" "}
                  {gameDetails?.display_event_start_time} -{" "}
                  {gameDetails?.display_event_end_time}
                </Text>
              </View>
              {/* <View style={{ position: "absolute", right: 10, top: 10 }}>
            <Icon name={"trash-can-outline"} size={28} color={Colors.primary} />
          </View> */}

              <InfoItem
                style={{ marginTop: pixelSizeHorizontal(15) }}
                iconSource={
                  <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
                }
                text={gameDetails?.venue_title}
              />
              <InfoItem
                iconSource={
                  <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
                }
                text={gameDetails?.venue_ground_title}
              />

              <InfoItem
                iconSource={
                  <Icon
                    name={
                      gameDetails?.is_public
                        ? "lock-open-outline"
                        : "lock-outline"
                    }
                    color={secondary}
                    size={28}
                  />
                }
                text={gameDetails?.is_public ? "Public Event" : "Private Event"}
              />
            </BasicCard>

            <View
              style={[
                styles.card,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: pixelSizeHorizontal(10),
                },
                CommonStyle.shadow,
              ]}
            >
              <NavigationIcon width={widthPixel(20)} height={widthPixel(20)} />
              <Text
                style={{
                  fontFamily: MEDIUM,
                  fontSize: FontSize.FS_13,
                  color: black,
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                {gameDetails?.venue_location}
              </Text>
            </View>

            <View
              style={[
                styles.card,
                { marginTop: pixelSizeHorizontal(10) },
                CommonStyle.shadow,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.titletext, { flex: 1 }]}>
                  Players ({gameDetails?.total_join_players})
                </Text>

                <Text
                  style={{
                    color: black,
                    fontSize: FontSize.FS_12,
                    fontFamily: MEDIUM,
                    marginRight: pixelSizeHorizontal(12),
                  }}
                >
                  See All
                </Text>
                <IconButton
                  additionalStyle={{
                    backgroundColor: primary,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: pixelSizeHorizontal(5),
                    borderRadius: widthPixel(50),
                  }}
                  onPress={() => {
                    navigate("AllPlayers", {
                      gameDetails: gameDetails,
                      players: gameDetails?.game_participants,
                    });
                  }}
                >
                  <Icon name={"chevron-right"} size={25} color={white} />
                </IconButton>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: pixelSizeHorizontal(12),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (gameDetails.user_id == userData?.id) {
                      navigate("Profile");
                    } else {
                      navigate("UserProfileDetails", {
                        userId: gameDetails.user_id,
                      });
                    }
                  }}
                >
                  <Image
                    source={{
                      uri: userData?.asset_url + filterGameHost()?.profile,
                    }}
                    style={{
                      width: widthPixel(52),
                      height: widthPixel(52),
                      borderRadius: widthPixel(52),
                      borderWidth: pixelSizeHorizontal(2),
                      borderColor: white,
                      resizeMode: "contain",
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <Text
                  style={[
                    {
                      color: black,
                      fontSize: FontSize.FS_14,
                      fontFamily: BOLD,
                      flex: 1,
                      marginHorizontal: pixelSizeHorizontal(5),
                    },
                  ]}
                >
                  {filterGameHost()?.name}
                </Text>
                <View
                  style={[
                    styles.badgeView,
                    {
                      backgroundColor: primary_light,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: primary,
                      fontSize: FontSize.FS_10,
                      fontFamily: SEMIBOLD,
                    }}
                  >
                    Host
                  </Text>
                </View>

                {filterGameHost()?.skill && (
                  <View
                    style={[
                      styles.badgeView,
                      {
                        backgroundColor: offWhite,
                        marginLeft: pixelSizeHorizontal(5),
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: black,
                        fontSize: FontSize.FS_10,
                        fontFamily: SEMIBOLD,
                      }}
                    >
                      {filterGameHost()?.skill}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {gameDetails?.instructions && (
              <>
                <View
                  style={[
                    styles.card,
                    {
                      marginTop: pixelSizeHorizontal(20),
                      flexDirection: "row",
                    },
                    CommonStyle.shadow,
                  ]}
                >
                  <Icon name={"information"} size={25} color={primary} />
                  <Text
                    style={[
                      styles.titletext,
                      { marginLeft: pixelSizeHorizontal(12) },
                    ]}
                  >
                    Instructions
                  </Text>
                </View>

                <View
                  style={[
                    styles.card,
                    { marginVertical: pixelSizeHorizontal(5) },
                    CommonStyle.shadow,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: FontSize.FS_12,
                      color: black,
                      fontFamily: REGULAR,
                    }}
                  >
                    {gameDetails?.instructions}
                  </Text>
                </View>
              </>
            )}

            <View
              style={[
                styles.card,
                { marginVertical: pixelSizeHorizontal(20) },
                CommonStyle.shadow,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.titletext, { flex: 1 }]}>
                  Questions ({gameDetails?.questions.length})
                </Text>

                {gameDetails?.questions.length > 1 ? (
                  <>
                    <Text
                      style={{
                        color: black,
                        fontSize: FontSize.FS_12,
                        fontFamily: MEDIUM,
                        marginRight: pixelSizeHorizontal(12),
                      }}
                    >
                      See All
                    </Text>
                    <IconButton
                      additionalStyle={{
                        backgroundColor: primary,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: pixelSizeHorizontal(5),
                        borderRadius: widthPixel(50),
                      }}
                      onPress={() => {
                        navigate("AllQuestions", {
                          game_data: gameDetails,
                          returnBack: () => {
                            console.log("return back");
                            Api_Get_Game_Details(true);
                          },
                        });
                      }}
                    >
                      <Icon name={"chevron-right"} size={25} color={white} />
                    </IconButton>
                  </>
                ) : null}
              </View>

              {gameDetails?.questions.length > 0 ? (
                <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.questionText]}>
                      <Text style={{ fontFamily: SEMIBOLD }}>Q. </Text>
                      {gameDetails?.questions?.[0]?.question}
                    </Text>
                    {gameDetails?.questions?.[0]?.can_i_delete_question && (
                      <IconButton
                        additionalStyle={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          Api_delete_question(
                            true,
                            gameDetails?.questions?.[0]?.id
                          );
                        }}
                      >
                        <Icon name={"delete"} size={22} color={secondary} />
                      </IconButton>
                    )}
                    {gameDetails?.questions?.[0]?.can_i_update_answer && (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderRadius: 5,
                          height: widthPixel(25),
                        }}
                        onPress={() => {
                          setReplyId(gameDetails?.questions?.[0]?.id);
                          setIsOpenReply(true);
                        }}
                      >
                        <Text style={[styles.questionText]}>Reply</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {gameDetails?.questions?.[0]?.answer ? (
                    <Text
                      style={[
                        styles.questionText,
                        { marginTop: pixelSizeHorizontal(5) },
                      ]}
                    >
                      <Text style={{ fontFamily: SEMIBOLD }}>A.</Text>
                      {gameDetails?.questions?.[0]?.answer}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <Text
                  style={[
                    CommonStyle.titleText,
                    { marginTop: pixelSizeVertical(20), textAlign: "center" },
                  ]}
                >
                  No Questions Yet!
                </Text>
              )}

              {/* <QuestionList
                gameDetails={gameDetails}
              /> */}

              <TouchableOpacity
                style={[
                  CommonStyle.mainBtnStyle,
                  {
                    backgroundColor: transparent,
                    borderWidth: 1,
                    borderColor: black,
                    marginHorizontal: pixelSizeHorizontal(20),
                    marginVertical: pixelSizeHorizontal(20),
                  },
                ]}
                onPress={() => setOpenQuestion(true)}
              >
                <Text style={[CommonStyle.mainBtnText, { color: black }]}>
                  Ask Questions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </HeaderView>

      {filterGameHost()?.user_id != userData?.id ? (
        <>
          {gameDetails?.spot_left != 0 &&
          gameDetails?.allow_to_join == true &&
          gameDetails?.cancelled_on == null &&
          gameDetails?.is_finished == 0 ? (
            <TouchableOpacity
              style={[
                CommonStyle.mainBtnStyle,
                {
                  marginHorizontal: pixelSizeHorizontal(20),
                  marginBottom: pixelSizeHorizontal(20),
                },
              ]}
              onPress={() => btnJoinGameTap()}
            >
              <Text style={CommonStyle.mainBtnText}>Join Game</Text>
            </TouchableOpacity>
          ) : null}
          {gameDetails?.allow_to_join == false &&
          gameDetails?.cancelled_on == null &&
          gameDetails?.is_finished == 0 ? (
            <TouchableOpacity
              style={[
                CommonStyle.mainBtnStyle,
                {
                  backgroundColor: transparent,
                  borderWidth: 1,
                  borderColor: black,
                  marginHorizontal: pixelSizeHorizontal(20),
                  marginVertical: pixelSizeHorizontal(20),
                  flexDirection: "row",
                },
              ]}
              onPress={() => {
                setLeaveType("Leave Game");
                setShowLeavePopup(true);
              }}
            >
              <Icon name={"close"} size={25} color={"black"} />
              <Text
                style={[
                  CommonStyle.mainBtnText,
                  { color: black, marginLeft: pixelSizeHorizontal(10) },
                ]}
              >
                Leave Game
              </Text>
            </TouchableOpacity>
          ) : null}
        </>
      ) : null}

      <BottomModal
        isVisible={isOpenQuestion}
        title={"Your Question"}
        onClose={() => setOpenQuestion(false)}
      >
        <View
          style={{ padding: pixelSizeHorizontal(15), backgroundColor: white }}
        >
          <Text style={[styles.questionText]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </Text>

          <View style={{ marginVertical: pixelSizeHorizontal(12) }}>
            <TextInputView
              style={{
                minHeight: 100,
                width: "100%",
                backgroundColor: white,
                borderColor: border,
              }}
              placeholder="Write a review (Optional)"
              multiline
              textAlignVertical="top"
              value={txtQuestion}
              onChangeText={(text) => {
                setTxtQuestion(text);
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity
            style={[CommonStyle.mainBtnStyle]}
            onPress={() => Api_Add_Question(true)}
          >
            <Text style={CommonStyle.mainBtnText}>Ask Question</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>

      <BottomModal
        isVisible={showLeavePopup}
        title={leaveType}
        onClose={() => setShowLeavePopup(false)}
      >
        <View
          style={{ padding: pixelSizeHorizontal(15), backgroundColor: white }}
        >
          <View style={{ marginVertical: pixelSizeHorizontal(12) }}>
            <TextInputView
              style={{
                minHeight: 100,
                width: "100%",
                backgroundColor: white,
                borderColor: border,
              }}
              placeholder="Write a leave reason (Optional)"
              multiline
              textAlignVertical="top"
              value={txtLeaveReason}
              onChangeText={(text) => {
                setTxtLeaveReason(text);
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity
            style={[CommonStyle.mainBtnStyle, { backgroundColor: red }]}
            onPress={() => Api_Leave_Game(true)}
          >
            <Text style={CommonStyle.mainBtnText}>Leave Game</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>

      <BottomModal
        isVisible={isOpenReply}
        title={"Reply Answer"}
        onClose={() => setIsOpenReply(false)}
      >
        <View
          style={{ padding: pixelSizeHorizontal(15), backgroundColor: white }}
        >
          <View style={{ marginVertical: pixelSizeHorizontal(12) }}>
            <TextInputView
              style={{
                minHeight: 100,
                width: "100%",
                backgroundColor: white,
                borderColor: border,
              }}
              placeholder="Write a Reply (Optional)"
              multiline
              textAlignVertical="top"
              value={txtReply}
              onChangeText={(text) => {
                setTxtReply(text);
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity
            style={[CommonStyle.mainBtnStyle]}
            onPress={() => {
              Api_update_question(true);
            }}
          >
            <Text style={CommonStyle.mainBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: FontSize.FS_18,
    fontFamily: BOLD,
    color: black,
  },
  card: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    padding: pixelSizeHorizontal(12),
  },
  badgeView: {
    paddingVertical: pixelSizeHorizontal(5),
    paddingHorizontal: pixelSizeHorizontal(15),
    borderRadius: 5,
  },
  questionText: {
    flex: 3,
    fontSize: FontSize.FS_12,
    fontFamily: REGULAR,
    color: black,
  },
});
export default GameDetails;
