import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 20"
    width={19}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.716 14.224h-7.22M12.716 10.037h-7.22M8.251 5.86H5.496"
    />
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.908.75 5.219.754C2.459.771.75 2.587.75 5.357v9.196c0 2.784 1.722 4.607 4.506 4.607l7.689-.003c2.76-.017 4.47-1.834 4.47-4.604V5.357c0-2.784-1.723-4.607-4.507-4.607Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
