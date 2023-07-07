import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Rect width={24} height={24} fill="#fff" rx={4} />
    <Rect
      width={23}
      height={23}
      x={0.5}
      y={0.5}
      stroke="#2F2B43"
      strokeOpacity={0.1}
      rx={3.5}
    />
  </Svg>
);
export default SvgComponent;
