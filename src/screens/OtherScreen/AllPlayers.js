import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useToast } from "native-base";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { black, primary, primary_light, white } from "../../constants/Color";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { user_data } from "../../redux/reducers/userReducer";
import { BOLD, FontSize, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import IconButton from "../../commonComponents/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AllPlayers = (props) => {
  const toast = useToast();
  const userData = useSelector(user_data);

  const { players, gameDetails } = props?.route?.params;

  const filterGameHost = (item) => {

    if(item?.user_id == gameDetails?.user_id){
        return true;
    }
    return false
    
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
          <FlatList
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
              return (
                <View
                  style={[
                    CommonStyle.card,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <View
                    style={[
                      {
                        width: 48,
                        height: 48,
                        borderRadius: 48 / 2,
                      },
                    ]}
                  >
                    <FastImage
                      style={{ flex: 1 }}
                      source={{
                        uri: userData?.asset_url + item?.profile,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: pixelSizeHorizontal(10),
                    }}
                  >
                    <Text style={[styles.titleText]}>{item?.name}</Text>
                    {item?.skill && (
                      <Text style={[styles.descriprionText, {marginTop : pixelSizeHorizontal(2)}]}>
                        {item?.skill}
                      </Text>
                    )}
                    <View>
                        {filterGameHost(item) ?
                    <View
                      style={[
                        styles.badgeView,
                        {
                          backgroundColor: primary_light,
                          marginTop : pixelSizeHorizontal(5)
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
                    </View> : null}
                    </View>
                  </View>

                  <IconButton onPress={() => {}}>
                    <Icon name={"dots-vertical"} size={25} color={black} />
                  </IconButton>
                </View>
              );
            }}
          />
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
    alignSelf: 'flex-start' 
  },
});
export default AllPlayers;
