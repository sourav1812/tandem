import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({focused}: {focused: boolean}) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={verticalScale(20)}
    height={verticalScale(23)}
    viewBox="0 0 17 20"
    fill="none">
    <Path
      stroke={focused ? '#4285F6' : '#474747'}
      fill={focused ? '#4285F6' : '#FFFFFF'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.485 13.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948Z"
      clipRule="evenodd"
    />
    <Path
      stroke={focused ? '#4285F6' : '#474747'}
      fill={focused ? '#4285F6' : '#FFFFFF'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.485 10.006A4.596 4.596 0 1 0 3.888 5.41a4.58 4.58 0 0 0 4.564 4.596h.033Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
