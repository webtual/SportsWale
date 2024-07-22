import * as React from "react"
import Svg, { Path } from "react-native-svg"
const UserDeleteIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      fill="#FE4B09"
      d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16Z"
    />
    <Path
      fill="#fff"
      d="M21.438 22.526a.712.712 0 0 1-.713.711H7.65a.71.71 0 0 1-.713-.711 5.073 5.073 0 0 1 5.068-5.068h4.362a5.073 5.073 0 0 1 5.07 5.068ZM18.208 12.784a4.022 4.022 0 1 1-8.044.002 4.022 4.022 0 0 1 8.044-.002ZM23.604 14.868l1.25-1.25a.711.711 0 1 0-1.007-1.007l-1.25 1.25-1.25-1.25a.712.712 0 1 0-1.008 1.007l1.25 1.25-1.25 1.25a.712.712 0 0 0 1.008 1.007l1.25-1.25 1.25 1.25a.712.712 0 0 0 1.007-1.007l-1.25-1.25Z"
    />
  </Svg>
)
export default UserDeleteIcon
