import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SearchIcon(props: any) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20.71 19.29L17 15.61A9 9 0 1015.61 17l3.68 3.68a1.002 1.002 0 001.42 0 1 1 0 000-1.39zM10 17a7 7 0 110-14 7 7 0 010 14z"
        fill="#3B3B3B"
      />
    </Svg>
  );
}

export default SearchIcon;
