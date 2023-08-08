import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 27 31"
    width={verticalScale(20)}
    height={verticalScale(24)}
    {...props}>
    <Path
      fill={props.fill}
      d="M0 0h27v29c0 1.105-.904 2.014-1.987 1.797-4.364-.873-7.901-4.275-11.513-4.275-3.554 0-7.183 3.391-11.514 4.271C.904 31.013 0 30.105 0 29V0Z"
    />
  </Svg>
);
export default SvgComponent;
