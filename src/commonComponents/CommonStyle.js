import { StyleSheet } from "react-native"
import { black, primary, secondary, white } from "../constants/Color"
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from "../constants/Fonts"
import { pixelSizeHorizontal, widthPixel } from "./ResponsiveScreen"



 export default StyleSheet.create({

    textInputStyle: {
        fontFamily: MEDIUM, fontSize: FontSize.FS_16, color: black,
    },
    inputTitle:{
        fontFamily: MEDIUM,
        color: black,
        fontSize: FontSize.FS_18,
    },
    mainBtnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    mainBtnText: {
        fontFamily: BOLD,
        color: white,
        fontSize: FontSize.FS_20,
        textTransform: 'capitalize',
    },
    oneLinerText:{
        fontFamily: MEDIUM, fontSize: FontSize.FS_14, color: primary,
    },
    errorText: {
        fontFamily: REGULAR,
        fontSize: FontSize.FS_13,
        color: secondary,
        // marginLeft: pixelSizeHorizontal(30)
    },
})
