import { View, Text, Animated, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { black, primary, white } from "../constants/Color";
import CommonStyle from "./CommonStyle";

const HorizontalTab = ({ tabs, currentTabIndex, onTabChange }) => {

    const [activeTab, setActiveTab] = useState(currentTabIndex || 0)
  const underlineWidth = new Animated.Value(0)


  const handleTabPress = (index) => {
    setActiveTab(index)

    onTabChange && onTabChange?.(index)
  }

  return (
    <View style={styles.container}>
      {tabs?.length ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs?.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabPress(index)}
            >
              <View
                style={[styles.tab, activeTab === index && styles.activeTab]}
              >
                <Text
                  style={[
                    CommonStyle.oneLinerText,
                    {
                      color:
                        activeTab === index
                          ? primary
                          : black,
                    },
                  ]}
                >
                  {tab?.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[
              styles.tabUnderline,
            ]}
          />
        </ScrollView>
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        // borderBottomWidth: 1,
        // borderBottomColor: white,
      },
      tab: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: primary, // or any color you prefer
      },
  
      tabUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        backgroundColor: primary, // same color as activeTab's borderBottomColor
      },
})

export default HorizontalTab;
