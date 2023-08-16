import East from '@tandem/assets/svg/arrows/East';
import North from '@tandem/assets/svg/arrows/North';
import NorthEast from '@tandem/assets/svg/arrows/NorthEast';
import NorthWest from '@tandem/assets/svg/arrows/NorthWest';
import West from '@tandem/assets/svg/arrows/West';

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
    case 'North':
      return <North rotation={rotation} isTablet={isTablet} />;
    case 'East':
      return <East rotation={rotation} isTablet={isTablet} />;
    case 'NorthEast':
      return <NorthEast rotation={rotation} isTablet={isTablet} />;

    case 'NorthWest':
      return <NorthWest rotation={rotation} isTablet={isTablet} />;

    case 'West':
      return <West rotation={rotation} isTablet={isTablet} />;
  }
};
export default RNArrowIconTop;
