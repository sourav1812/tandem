import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width={35}
    height={35}
    fill="none"
    {...props}>
    <Rect width={40} height={40} fill="#4285F6" rx={8} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M17.043 13.793a1 1 0 0 1 1.414 0l5.5 5.5a1 1 0 0 1 0 1.414l-5.5 5.5a1 1 0 0 1-1.414-1.414L21.836 20l-4.793-4.793a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
