import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { pixelSizeHorizontal, widthPixel } from './ResponsiveScreen';
import { FontSize, SEMIBOLD , BOLD , REGULAR , MEDIUM } from '../constants/Fonts';
import { black, primary , white } from '../constants/Color';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigate } from '../navigations/RootNavigation';

export default function QuestionList({ gameDetails}) {
    console.log("🚀 ~ QuestionList ~ gameDetails:", gameDetails)
    const renderQuestion = (question, index) => (
        <View key={index} style={{ marginVertical: pixelSizeHorizontal(20) }}>
          <Text style={[styles.questionText]}>
            <Text style={{ fontFamily: SEMIBOLD }}>Q. </Text>
            {question.question}
          </Text>
          {question.answer && (
            <Text style={[styles.questionText, { marginTop: pixelSizeHorizontal(5) }]}>
              <Text style={{ fontFamily: SEMIBOLD }}>A. </Text>
              {question.answer}
            </Text>
          )}
        </View>
      );
    
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.titletext, { flex: 1 }]}>
          Questions ({gameDetails?.questions.length})
        </Text>
        {gameDetails?.questions.length > 1 && (
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
            <TouchableOpacity
              style={{
                backgroundColor: primary,
                alignItems: "center",
                justifyContent: "center",
                padding: pixelSizeHorizontal(5),
                borderRadius: widthPixel(50),
              }}
              onPress={() => navigate("AllQuestions", { game_data: gameDetails })}
            >
              <Icon name={"chevron-right"} size={25} color={white} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {gameDetails?.questions.length > 0 ? (
        gameDetails.questions.map((question, index) => renderQuestion(question, index))
      ) : (
        <Text style={[CommonStyle.titleText, { marginTop: pixelSizeVertical(20), textAlign: "center" }]}>
          No Questions Yet!
        </Text>
      )}
    </View>
  )
}

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
      fontSize: FontSize.FS_12,
      fontFamily: REGULAR,
      color: black,
    },
  });