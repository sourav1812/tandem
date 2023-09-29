import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   xmlns="http://www.w3.org/2000/svg"
    height={verticalScale(30)}
    width={verticalScale(30)}
    viewBox="0 0 72 72"
    {...props}>
    <Path
      fill="#FCEA2B"
      d="M36.2 13.316c-12.572 0-22.8 10.228-22.8 22.8 0 12.572 10.228 22.8 22.8 22.8 12.572 0 22.8-10.228 22.8-22.8 0-12.572-10.228-22.8-22.8-22.8z"
    />
    <Circle
      cx={36}
      cy={36}
      r={23}
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M44.7 43.92c-6.328-1.736-11.41-.906-17.4 1.902"
    />
    <Path d="M30 31a3.001 3.001 0 0 1-6 0c0-1.655 1.345-3 3-3s3 1.345 3 3M48 31a3.001 3.001 0 0 1-6 0c0-1.655 1.345-3 3-3s3 1.345 3 3" />
  </Svg>
);
export default SvgComponent;
