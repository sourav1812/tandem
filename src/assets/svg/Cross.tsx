import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"/
    viewBox="0 0 12 12"
    width={verticalScale(12)}
    height={verticalScale(12)}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      d="M10.243 11.657a1 1 0 0 0 1.414-1.414L7.414 6l4.243-4.243A1 1 0 0 0 10.243.343L6 4.586 1.757.343A1 1 0 1 0 .343 1.757L4.586 6 .343 10.243a1 1 0 1 0 1.414 1.414L6 7.414l4.243 4.243Z"
    />
  </Svg>
);
export default SvgComponent;
