import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={27}
        height={31}
        viewBox="0 -960 960 960"
        {...props}
    >
        <Path d="M220.001-150.002v-616.15q0-23.231 17.039-40.462 17.038-17.231 40.654-17.231h404.612q23.616 0 40.654 17.231 17.039 17.231 17.039 40.462v616.15L480-261.54 220.001-150.002Z" />
    </Svg>
)
export default SvgComponent;
