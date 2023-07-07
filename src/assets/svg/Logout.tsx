import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    width={22}
    height={22}
    fill="none"
    {...props}>
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.017 6.39v-.934a3.685 3.685 0 0 0-3.685-3.685H5.455a3.685 3.685 0 0 0-3.684 3.685v11.13a3.685 3.685 0 0 0 3.684 3.686h4.885a3.675 3.675 0 0 0 3.676-3.674v-.943M20.81 11.021H8.769M17.882 8.106l2.928 2.915-2.928 2.916"
    />
  </Svg>
);
export default SvgComponent;
