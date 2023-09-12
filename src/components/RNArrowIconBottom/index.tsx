import South from '@tandem/assets/svg/arrows/South';
import SouthEast from '@tandem/assets/svg/arrows/SouthEast';
import SouthWest from '@tandem/assets/svg/arrows/SouthWest';
import {DIRECTION_ARROWS} from '@tandem/constants/enums';

const RNArrowIconBottom = ({
  type,
  rotation,
  isTablet,
}: {
  type: string;
  rotation?: number;
  isTablet?: boolean;
}) => {
  switch (type) {
    case DIRECTION_ARROWS.SOUTH_WEST:
      return <SouthWest rotation={rotation} isTablet={isTablet} />;
    case DIRECTION_ARROWS.SOUTH:
      return <South rotation={rotation} isTablet={isTablet} />;
    case DIRECTION_ARROWS.SOUTH_EAST:
      return <SouthEast rotation={rotation} isTablet={isTablet} />;
  }
};
export default RNArrowIconBottom;
