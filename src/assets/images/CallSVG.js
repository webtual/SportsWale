import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CallSVG = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      fill="#FD3667"
      d="M6.366 7.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.421 11.421 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C6.94 18 0 11.06 0 2.5 0 1.962.027 1.428.082.898A1 1 0 0 1 1.077 0h4.462a1 1 0 0 1 .997.921A11.421 11.421 0 0 0 7.9 5.504a1 1 0 0 1-.296 1.294l-1.238.884Zm-2.522-.657 1.9-1.357A13.41 13.41 0 0 1 4.647 2H2.01c-.006.166-.009.333-.009.5C2 9.956 8.044 16 15.5 16c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.45 12.45 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.441 12.441 0 0 1-.75-1.588Z"
    />
  </Svg>
)
export default CallSVG
