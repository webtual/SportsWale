import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import { FontSize, MEDIUM } from "../../constants/Fonts";
import { dim_grey } from "../../constants/Color";

export default function BookingPolicy() {
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Booking Policies"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>Booking Policies</Text>

          {/* render booking policies */}

          <Text style={styles.headerText}>Venue Policies</Text>

          {/* render Venue policies */}

          <Text style={styles.headerText}>Payment Policies</Text>

          {/* render Payment policies */}
          
        </View>
      </HeaderView>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: MEDIUM,
    fontSize: FontSize.FS_14,
    color: dim_grey,
    marginVertical: pixelSizeHorizontal(10),
  },
});
