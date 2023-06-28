import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 3"
    width={17}
    height={3}
    fill="none"
    {...props}
  >
    <Path fill="#4285F6" d="M1.5.5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2h-14Z" />
  </Svg>
)
export default SvgComponent
