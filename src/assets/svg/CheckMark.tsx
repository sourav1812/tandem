import themeColor from '@tandem/theme/themeColor';
import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {G, Path, Svg, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      width={verticalScale(12)}
      height={verticalScale(12)}
      viewBox="0 0 224.313 168.235"
      {...props}>
      <G data-name="Group 50607" transform="translate(.001 -45.958)">
        <Path
          fill={themeColor.green}
          d="M70.1 214.194a14.019 14.019 0 01-9.913-4.106L4.106 154.009a14.019 14.019 0 0119.826-19.826L70.1 180.348 200.38 50.065a14.019 14.019 0 1119.826 19.826l-140.2 140.2a14.018 14.018 0 01-9.913 4.107z"
          data-name="Path 34416"></Path>
      </G>
    </Svg>
  );
};

export default SvgComponent;
