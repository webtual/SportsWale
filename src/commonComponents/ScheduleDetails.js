import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/CustomeColor";
import FastImage from "react-native-fast-image";
import { ic_navigation } from "../constants/Images";
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from "../constants/Fonts";
import Divider from "./Divider";
import { ic_chat, ic_history } from "../constants/Images";
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "./ResponsiveScreen";

export default function ScheduleDetails({ Activity }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate("VenueDetail", { item: item })}
        activeOpacity={0.7}
        style={[
          {
            backgroundColor: Colors.white,
            minHeight: 200,
            borderRadius: 10,
            shadowColor: Colors.black05,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 8,
            elevation: 3,
            paddingLeft: pixelSizeHorizontal(10),
            paddingTop: pixelSizeVertical(15),
            paddingBottom: pixelSizeVertical(10),
            marginVertical: pixelSizeVertical(10),
          },
          styles,
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <FastImage
            style={{
              width: 50,
              height: 50,
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
            <View
              style={{
                paddingVertical: 5,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <FastImage
                style={{
                  width: 18,
                  height: 18,
                }}
                source={ic_navigation}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_13,
                  color: Colors.black05,
                  marginLeft: 5,
                }}
              >
                Vistara Venue
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 0.5,
              paddingHorizontal: pixelSizeHorizontal(10),
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: pixelSizeVertical(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_14,
                color: Colors.black,
              }}
            >
              7:30Am to 9:00am
            </Text>
            {Activity === "Past" && (
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: MEDIUM,
                    fontSize: FontSize.FS_10,
                    color: Colors.black05,
                  }}
                >
                  Click to view Booking Details
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {Activity == "Past" && (
            <View
              style={{
                paddingVertical: 4,
                marginVertical: pixelSizeVertical(10),
                backgroundColor: Colors.secondary,
                width: 70,
                borderRadius: 6,
                alignItems: "center",
                marginRight: pixelSizeHorizontal(10),
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
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            {["Public", "Tournament"].map((label, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: 7,
                    color: Colors.black,
                    marginRight: pixelSizeHorizontal(10),
                  }}
                >
                  {"\u2B24"}
                </Text>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_12,
                    color: Colors.black,
                    marginRight: pixelSizeHorizontal(10),
                  }}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_12,
              color: Colors.black,
              marginRight: pixelSizeHorizontal(25),
              textAlign: "center",
            }}
          >
            160{"\n"}Going
          </Text>
        </View>
        <Divider style={{ marginVertical: pixelSizeVertical(10) }} />

        {Activity === "Upcoming" ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FastImage
              style={{
                width: 28,
                height: 28,
              }}
              source={ic_chat}
              resizeMode="cover"
            />
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_14,
                color: Colors.black,
                marginLeft: pixelSizeHorizontal(10),
              }}
            >
              Chat
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <FastImage
                style={{
                  width: 28,
                  height: 28,
                }}
                source={ic_chat}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_14,
                  color: Colors.black,
                  marginLeft: pixelSizeHorizontal(10),
                }}
              >
                Chat
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginRight: pixelSizeHorizontal(10),
              }}
            >
              <FastImage
                style={{
                  width: 28,
                  height: 28,
                }}
                source={ic_history}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_14,
                  color: Colors.black,
                  marginLeft: pixelSizeHorizontal(10),
                }}
              >
                Re-Host
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
