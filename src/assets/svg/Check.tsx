import * as React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SVGComponent = (props: SvgProps) => (
  <Svg
    width={verticalScale(20)}
    height={verticalScale(20)}
    viewBox="0 0 32 32"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.1253 8.35758C26.6181 8.84097 26.6258 9.63239 26.1424 10.1253L13.3924 23.1253C13.1588 23.3634 12.8397 23.4984 12.5061 23.5C12.1724 23.5016 11.852 23.3698 11.6161 23.1339L5.36612 16.8839C4.87796 16.3957 4.87796 15.6043 5.36612 15.1161C5.85427 14.628 6.64573 14.628 7.13388 15.1161L12.4914 20.4736L24.3576 8.37474C24.841 7.88187 25.6324 7.87418 26.1253 8.35758Z"
      fill="#1E202C"
    />
  </Svg>
);
export default SVGComponent;
