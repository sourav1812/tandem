import East from '@tandem/assets/svg/arrows/East';
import North from '@tandem/assets/svg/arrows/North';
import NorthEast from '@tandem/assets/svg/arrows/NorthEast';
import NorthWest from '@tandem/assets/svg/arrows/NorthWest';
import West from '@tandem/assets/svg/arrows/West';

const RNArrowIconTop = ({
  type,
  rotation,
}: {
  type: string;
  rotation?: number;
}) => {
  switch (type) {
    case 'North':
      return <North rotation={rotation} />;
    case 'East':
      return <East rotation={rotation} />;
    case 'NorthEast':
      return <NorthEast rotation={rotation} />;

    case 'NorthWest':
      return <NorthWest rotation={rotation} />;

    case 'West':
      return <West rotation={rotation} />;
  }
};
export default RNArrowIconTop;
