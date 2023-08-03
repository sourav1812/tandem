import South from '@tandem/assets/svg/arrows/South';
import SouthEast from '@tandem/assets/svg/arrows/SouthEast';
import SouthWest from '@tandem/assets/svg/arrows/SouthWest';

const RNArrowIconBottom = ({type}: {type: string}) => {
  switch (type) {
    case 'SouthWest':
      return <SouthWest />;
    case 'South':
      return <South />;
    case 'SouthEast':
      return <SouthEast />;
  }
};
export default RNArrowIconBottom;
