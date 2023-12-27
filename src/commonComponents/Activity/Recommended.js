import { StyleSheet, Text, View, FlatList , Image } from "react-native";
import React from "react";
import GamesCard from "../GamesCard";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import { VenuesData } from "../../DummyData/Data";
import { widthPixel, heightPixel , pixelSizeHorizontal} from "../ResponsiveScreen";
import { HomeBanner } from "../../DummyData/Data";
import CarouselCard from "../Carousel/lib/Card";


export default function Recommended() {
  return (
    <View>
      <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
        <CarouselCard
          height={180}
          interval={4000}
          data={HomeBanner}
          onPress={(item) => {}}
          contentRender={(item) => (
            <View style={{ borderRadius: widthPixel(10) }}>
              <Image
                style={{
                  borderRadius: widthPixel(8),
                  width: "100%",
                  height: "100%",
                  borderRadius: widthPixel(10),
                }}
                source={{
                  uri: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
                }}
              />
            </View>
          )}
        />
      </View>

      <FlatList
        data={VenuesData}
        ItemSeparatorComponent={() => (
          <View
            style={{ width: widthPixel(15), height: heightPixel(15) }}
          ></View>
        )}
        renderItem={({ item }) => (
          <GamesCard cardStyles={{ width: SCREEN_WIDTH / 1.1 }} bookMark={true} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
