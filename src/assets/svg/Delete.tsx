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
      stroke="#FF0101"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.324 7.468s-.543 6.735-.858 9.572c-.15 1.355-.987 2.149-2.358 2.174-2.61.047-5.221.05-7.83-.005-1.318-.027-2.141-.831-2.288-2.162-.317-2.862-.857-9.58-.857-9.58M17.708 4.24H.75M14.439 4.24a1.648 1.648 0 0 1-1.615-1.325L12.58 1.7A1.28 1.28 0 0 0 11.344.75H7.11a1.28 1.28 0 0 0-1.237.95L5.63 2.914A1.648 1.648 0 0 1 4.016 4.24"
    />
  </Svg>
);
export default SvgComponent;
