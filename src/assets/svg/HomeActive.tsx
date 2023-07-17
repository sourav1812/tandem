import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 20"
    width={verticalScale(21)}
    height={verticalScale(23)}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      fillRule="evenodd"
      d="M6.657 18.771v-3.066c0-.78.636-1.414 1.424-1.42h2.886c.792 0 1.433.636 1.433 1.42v3.076c0 .662.534 1.204 1.203 1.219h1.924C17.445 20 19 18.46 19 16.562V7.838a2.44 2.44 0 0 0-.962-1.905L11.458.685a3.18 3.18 0 0 0-3.945 0L.962 5.943A2.42 2.42 0 0 0 0 7.847v8.715C0 18.46 1.555 20 3.473 20h1.924c.685 0 1.241-.55 1.241-1.229"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
