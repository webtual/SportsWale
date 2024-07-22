import * as React from "react"
import Svg, { Path } from "react-native-svg"
const UsersIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      fill={props?.color ? props?.color : "#3D6FE3"}
      d="M10 9a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L10 11a3 3 0 0 0-2.995 2.824L7 14v6H5v-6a5 5 0 0 1 5-5Zm-6.5 3c.279 0 .55.033.81.094a5.948 5.948 0 0 0-.301 1.575L4 14v.086a1.493 1.493 0 0 0-.356-.08L3.5 14a1.5 1.5 0 0 0-1.493 1.355L2 15.5V20H0v-4.5A3.5 3.5 0 0 1 3.5 12Zm13 0a3.5 3.5 0 0 1 3.5 3.5V20h-2v-4.5a1.5 1.5 0 0 0-1.355-1.493L16.5 14c-.175 0-.343.03-.5.085V14c0-.666-.108-1.306-.309-1.904.259-.063.53-.096.809-.096Zm-13-6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-13 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm13 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
    />
  </Svg>
)
export default UsersIcon
