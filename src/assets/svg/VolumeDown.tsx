import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 16"
    width={18}
    height={16}
    fill="none"
    {...props}>
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.002 8c-.003 1.23-.058 2.907.703 3.534.71.585 1.209.434 2.504.53 1.297.095 4.033 3.906 6.142 2.7 1.088-.855 1.17-2.649 1.17-6.764s-.082-5.909-1.17-6.764C8.241.029 5.506 3.84 4.21 3.937c-1.295.095-1.794-.055-2.504.53C.945 5.092.999 6.77 1.002 8Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.581 4.314a7.399 7.399 0 0 1 0 7.372"
    />
  </Svg>
);
export default SvgComponent;
