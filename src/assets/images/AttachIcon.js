import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AttachIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={20}
    viewBox="0 0 19 20"
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m12.829 5.757-5.657 5.657a1 1 0 1 0 1.414 1.414l5.657-5.657A3 3 0 0 0 10 2.928L4.343 8.585a5 5 0 0 0 7.071 7.071L17.071 10l1.414 1.414-5.656 5.657a7 7 0 0 1-9.9-9.9l5.657-5.657a5 5 0 0 1 7.071 7.071L10 14.242A3 3 0 0 1 5.758 10l5.656-5.657 1.415 1.414Z"
    />
  </Svg>
)
export default AttachIcon
