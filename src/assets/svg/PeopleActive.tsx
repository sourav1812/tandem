import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 20"
    width={verticalScale(18)}
    height={verticalScale(23.5)}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      fillRule="evenodd"
      d="M7.985 13.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.281-2.948-7.17-2.948ZM7.985 10.006A4.596 4.596 0 1 0 3.389 5.41a4.58 4.58 0 0 0 4.564 4.596h.032Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
