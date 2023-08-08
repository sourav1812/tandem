import {Dimensions} from 'react-native';

const tooltipHelperTop = (positionRefs: {
  height: number;
  width: number;
  x: number;
  y: number;
}) => {
  const {width, height} = Dimensions.get('screen');
  if (positionRefs.x > width / 2 && positionRefs.y < height / 2) {
    return 'NorthEast';
  } else if (positionRefs.x < width / 2 && positionRefs.y < height / 2) {
    return 'NorthWest';
  } else if (positionRefs.x < width / 2 && positionRefs.y > height / 2) {
    return null;
  } else if (positionRefs.x > width / 2 && positionRefs.y > height / 2) {
    return null;
  } else if (positionRefs.x === width / 2 && positionRefs.y < height / 2) {
    return 'North';
  } else if (positionRefs.x < width / 2 && positionRefs.y === height / 2) {
    return 'West';
  } else if (positionRefs.x === width / 2 && positionRefs.y > height / 2) {
    return null;
  } else if (positionRefs.x > width / 2 && positionRefs.y === height / 2) {
    return 'East';
  } else return null;
};
const tooltipHelperBottom = (positionRefs: {
  height: number;
  width: number;
  x: number;
  y: number;
}) => {
  const {width, height} = Dimensions.get('window');
  if (positionRefs.x > width / 2 && positionRefs.y < height / 2) {
    return null;
  } else if (positionRefs.x < width / 2 && positionRefs.y < height / 2) {
    return null;
  } else if (positionRefs.x < width / 2 && positionRefs.y > height / 2) {
    return 'SouthWest';
  } else if (positionRefs.x > width / 2 && positionRefs.y > height / 2) {
    return 'SouthEast';
  } else if (positionRefs.x === width / 2 && positionRefs.y < height / 2) {
    return null;
  } else if (positionRefs.x < width / 2 && positionRefs.y === height / 2) {
    return null;
  } else if (positionRefs.x === width / 2 && positionRefs.y > height / 2) {
    return 'South';
  } else if (positionRefs.x > width / 2 && positionRefs.y === height / 2) {
    return null;
  } else return null;
};
export {tooltipHelperTop, tooltipHelperBottom};
