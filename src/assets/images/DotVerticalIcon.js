import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DotVerticalIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={18}
    viewBox="0 0 4 18"
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M2 0C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0-7C.9 7 0 7.9 0 9s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
    />
  </Svg>
)
export default DotVerticalIcon
