import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderView from "../../commonComponents/HeaderView";
import { Input } from "native-base";
import { Colors } from "../../constants/CustomeColor";
import { VenuesData } from "../../DummyData/Data";
import VenuesCard from "../../commonComponents/VenuesCard";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import CarouselCard from "../../commonComponents/Carousel/lib/Card";
import { HomeBanner } from "../../DummyData/Data";
import BasicCard from "../../commonComponents/BasicCard";
import FastImage from "react-native-fast-image";

const Venue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(VenuesData);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = VenuesData.filter((venue) =>
      venue.venueName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title="Venues"
        isBack={false}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(0) }}
        titleColor={Colors.white}
        rightComponent={
          <TouchableOpacity onPress={() => navigate("AddVenue")}>
            <Icon name="plus-circle-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        }
      >
        <View>
          <View
            style={{
              marginVertical: pixelSizeHorizontal(15),
              marginHorizontal: pixelSizeHorizontal(20),
            }}
          >
            <Input
              backgroundColor={Colors.white}
              size="md"
              h={"10"}
              _focus={{ borderColor: Colors.primary, borderWidth: 1.5 }}
              InputLeftElement={
                <Icon
                  name={"magnify"}
                  style={{ marginHorizontal: 5 }}
                  pr={"2"}
                  size={26}
                  color={Colors.secondary}
                />
              }
              placeholder="Search game"
              onChangeText={handleSearch}
            />
          </View>

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

          <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
            <BasicCard
              style={{
                paddingVertical:8,
                borderWidth: 0,
                marginBottom: 10,
                elevation: 1,
                shadowColor: Colors.black05,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FastImage
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
                    }}
                    resizeMode="cover"
                  />
                  <View style={{ marginLeft: 15 }}>
                    <Text
                      style={{
                        fontFamily: SEMIBOLD,
                        fontSize: FontSize.FS_14,
                        color: Colors.black,
                      }}
                    >
                      Universal Football game
                    </Text>
                    <Text
                      style={{
                        fontFamily: SEMIBOLD,
                        fontSize: FontSize.FS_12,
                        color: Colors.black05,
                      }}
                    >
                      Last played on 08 Novmber,2023
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: 4,
                    backgroundColor: Colors.secondary,
                    width: 70,
                    borderRadius: 6,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: SEMIBOLD,
                      fontSize: FontSize.FS_13,
                      color: Colors.white,
                    }}
                  >
                    Booked
                  </Text>
                </View>
              </View>
            </BasicCard>
          </View>

          <FlatList
            data={filteredData}
            ItemSeparatorComponent={() => (
              <View
                style={{ width: widthPixel(15), height: heightPixel(15) }}
              ></View>
            )}
            renderItem={({ item }) => (
              <VenuesCard item={item} styles={{ width: SCREEN_WIDTH / 1.1 }} />
            )}
          />
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
});

export default Venue;
