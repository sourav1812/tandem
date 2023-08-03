import East from '@tandem/assets/svg/arrows/East';
import North from '@tandem/assets/svg/arrows/North';
import NorthEast from '@tandem/assets/svg/arrows/NorthEast';
import NorthWest from '@tandem/assets/svg/arrows/NorthWest';
import West from '@tandem/assets/svg/arrows/West';

const RNArrowIconTop = ({type}: {type: string}) => {
  console.log(type);
  switch (type) {
    case 'North':
      return <North />;
    case 'East':
      return <East />;
    case 'NorthEast':
      return <NorthEast />;

    case 'NorthWest':
      return <NorthWest />;

    case 'West':
      return <West />;
  }
};
export default RNArrowIconTop;
