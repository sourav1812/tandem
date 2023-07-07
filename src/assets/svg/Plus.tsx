import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
    width={17}
    height={17}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      d="M9.5 1.5a1 1 0 0 0-2 0v6h-6a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6v-6Z"
    />
  </Svg>
);
export default SvgComponent;
