import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GroundIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={18}
    viewBox="0 0 26 18"
    fill="none"
    {...props}
  >
    <Path
       fill={props?.color ? props?.color : "#3D6FE3"}
      d="M22.75 17.938H3.25A2.438 2.438 0 0 1 .812 15.5v-13A2.438 2.438 0 0 1 3.25.062h19.5A2.437 2.437 0 0 1 25.188 2.5v13a2.438 2.438 0 0 1-2.438 2.438Zm-20.313-6.5h1.626V6.561H2.438v4.875Zm9.75-9.75H3.25a.812.812 0 0 0-.813.812v2.438h2.438a.812.812 0 0 1 .813.812v6.5a.812.812 0 0 1-.813.813H2.437V15.5a.812.812 0 0 0 .813.813h8.938v-4.177a3.25 3.25 0 0 1 0-6.272V1.688ZM11.376 9a1.625 1.625 0 1 0 3.25 0 1.625 1.625 0 0 0-3.25 0Zm12.188-2.438h-1.625v4.875h1.625V6.564Zm0 6.5h-2.438a.812.812 0 0 1-.813-.812v-6.5a.812.812 0 0 1 .813-.813h2.438V2.5a.812.812 0 0 0-.813-.813h-8.938v4.177a3.25 3.25 0 0 1 0 6.272v4.177h8.938a.812.812 0 0 0 .813-.813v-2.438Z"
    />
  </Svg>
)
export default GroundIcon

