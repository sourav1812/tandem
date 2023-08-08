import South from '@tandem/assets/svg/arrows/South';
import SouthEast from '@tandem/assets/svg/arrows/SouthEast';
import SouthWest from '@tandem/assets/svg/arrows/SouthWest';

const RNArrowIconBottom = ({
  type,
  rotation,
}: {
  type: string;
  rotation?: number;
}) => {
  switch (type) {
    case 'SouthWest':
      return <SouthWest rotation={rotation} />;
    case 'South':
      return <South rotation={rotation} />;
    case 'SouthEast':
      return <SouthEast rotation={rotation} />;
  }
};
export default RNArrowIconBottom;
