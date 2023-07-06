import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width={40}
    height={40}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      d="M20.926 7.176a1.25 1.25 0 0 0-2.5 0v11.25H7.176a1.25 1.25 0 0 0 0 2.5h11.25v11.25a1.25 1.25 0 0 0 2.5 0v-11.25h11.25a1.25 1.25 0 0 0 0-2.5h-11.25V7.176Z"
    />
  </Svg>
);
export default SvgComponent;
