import East from '@tandem/assets/svg/arrows/East';
import North from '@tandem/assets/svg/arrows/North';
import NorthEast from '@tandem/assets/svg/arrows/NorthEast';
import NorthWest from '@tandem/assets/svg/arrows/NorthWest';
import West from '@tandem/assets/svg/arrows/West';
import {DIRECTION_ARROWS} from '@tandem/constants/enums';
import React from 'react';

const RNArrowIconTop = ({
  type,
  rotation,
  isTablet,
}: {
  type: string;
  rotation?: number;
  isTablet?: boolean;
}) => {
  switch (type) {
    case DIRECTION_ARROWS.NORTH:
      return <North rotation={rotation} isTablet={isTablet} />;
    case DIRECTION_ARROWS.EAST:
      return <East rotation={rotation} isTablet={isTablet} />;
    case DIRECTION_ARROWS.NORTH_EAST:
      return <NorthEast rotation={rotation} isTablet={isTablet} />;

    case DIRECTION_ARROWS.NORTH_WEST:
      return <NorthWest rotation={rotation} isTablet={isTablet} />;

    case DIRECTION_ARROWS.WEST:
      return <West rotation={rotation} isTablet={isTablet} />;
  }
};
export default RNArrowIconTop;
