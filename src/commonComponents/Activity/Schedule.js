import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/CustomeColor";
import ScheduleDetails from "../ScheduleDetails";

export default function Schedule() {
  const [selectedItem, setSelectedItem] = useState("Upcoming");

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                selectedItem === "Upcoming" ? Colors.secondary : null,
            },
          ]}
          onPress={() => setSelectedItem("Upcoming")}
        >
          <Text
            style={{
              color: selectedItem === "Upcoming" ? Colors.white : Colors.black,
            }}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                selectedItem === "Past" ? Colors.secondary : null,
            },
          ]}
          onPress={() => setSelectedItem("Past")}
        >
          <Text
            style={{
              color: selectedItem === "Past" ? Colors.white : Colors.black,
            }}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScheduleDetails Activity={selectedItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 100,
    height: 30,
    borderWidth: 0.5,
    marginRight: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
