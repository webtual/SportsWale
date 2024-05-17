import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useToast } from "native-base";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal, widthPixel } from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { black, primary, primary_light, white } from "../../constants/Color";
import { useSelector } from "react-redux";
import { user_data } from "../../redux/reducers/userReducer";
import { BOLD, FontSize, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import IconButton from "../../commonComponents/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HorizontalTab from "../../commonComponents/HorizontalTab";
import PlayerRequest from "./PlayerRequest";

const AllPlayers = (props) => {
  const toast = useToast();
  const userData = useSelector(user_data);
  const [currentSelectedTab, setCurrentSelectedTab] = useState(0);

  const { players, gameDetails } = props?.route?.params;

  const filterGameHost = (item) => {
    if (item?.user_id == gameDetails?.user_id) {
      return true;
    }
    return false;
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"All Players"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <HorizontalTab
            tabs={gameDetails?.is_public ? [{ name: "All Players" }] : [{ name: `All Players (${players.length})` }]}
            // tabs={gameDetails?.is_public ? [{ name: "All Players" }] : [{ name: `All Players (${players.length})` }, { name: "Requests" }]}
            currentTabIndex={currentSelectedTab}
            onTabChange={(currentIndex) => {
              console.log("currentIndex", currentIndex);
              setCurrentSelectedTab(currentIndex);
            }}
          />

          {currentSelectedTab == 0 ?  <FlatList
            data={players || []}
            ListHeaderComponent={
              <View style={{ height: pixelSizeHorizontal(12) }} />
            }
            ListFooterComponent={
              <View style={{ height: pixelSizeHorizontal(12) }} />
            }
            ItemSeparatorComponent={
              <View style={{ height: pixelSizeHorizontal(5) }} />
            }
            renderItem={({ item, index }) => {
              console.log("🚀 ~ AllPlayers ~ item:", item)
              return (
                <View
                  style={[
                    CommonStyle.card,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      {
                        width: widthPixel(48),
                        height: widthPixel(48),
                        borderRadius: widthPixel(48/2),
                        overflow: "hidden",
                      },
                    ]}
                    onPress={()=>{
                      if(item.user_id == userData?.id){
                        navigate("Profile")
                      }
                      else{
                        navigate('UserProfileDetails',{userId : item.user_id})
                      }
                    }}
                  >
                    <Image
                      style={{ flex: 1, resizeMode: "cover" }}
                      source={{
                        uri: userData?.asset_url + item?.profile,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: pixelSizeHorizontal(10),
                    }}
                  >
                    <Text style={[styles.titleText]}>{item?.name}</Text>
                    {item?.total_join_player && (
                      <Text
                        style={[
                          styles.descriprionText,
                          { marginTop: pixelSizeHorizontal(2) },
                        ]}
                      >
                        {item?.total_join_player} players join
                      </Text>
                    )}
                    <View>
                      {filterGameHost(item) ? (
                        <View
                          style={[
                            styles.badgeView,
                            {
                              backgroundColor: primary_light,
                              marginTop: pixelSizeHorizontal(5),
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
                      ) : null}
                    </View>
                  </View>

                  <IconButton onPress={() => {}}>
                    <Icon name={"dots-vertical"} size={25} color={black} />
                  </IconButton>
                </View>
              );
            }}
          /> : currentSelectedTab == 1 ? (
            <PlayerRequest />
          ) : null}
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: FontSize.FS_14,
    fontFamily: BOLD,
    color: black,
  },
  descriprionText: {
    fontSize: FontSize.FS_12,
    fontFamily: REGULAR,
    color: black,
  },
  badgeView: {
    paddingVertical: pixelSizeHorizontal(5),
    paddingHorizontal: pixelSizeHorizontal(15),
    borderRadius: 5,
    alignSelf: "flex-start",
  },
});
export default AllPlayers;
