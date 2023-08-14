import South from '@tandem/assets/svg/arrows/South';
import SouthEast from '@tandem/assets/svg/arrows/SouthEast';
import SouthWest from '@tandem/assets/svg/arrows/SouthWest';

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
    case 'SouthWest':
      return <SouthWest rotation={rotation} isTablet={isTablet} />;
    case 'South':
      return <South rotation={rotation} isTablet={isTablet} />;
    case 'SouthEast':
      return <SouthEast rotation={rotation} isTablet={isTablet} />;
  }
};
export default RNArrowIconBottom;
