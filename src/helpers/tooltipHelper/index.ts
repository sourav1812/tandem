import {Dimensions} from 'react-native';

const tooltipHelperTop = (positionRefs?: {
  height: number;
  width: number;
  x: number;
  y: number;
}) => {
  if (!positionRefs) {
    return null;
  }
  const {width, height} = Dimensions.get('screen');
  if (positionRefs.x > width / 2 && positionRefs.y < height / 2) {
    return 'NorthEast';
  }
  if (positionRefs.x < width / 2 && positionRefs.y < height / 2) {
    return 'NorthWest';
  }
  if (positionRefs.x < width / 2 && positionRefs.y > height / 2) {
    return null;
  }
  if (positionRefs.x > width / 2 && positionRefs.y > height / 2) {
    return null;
  }
  if (positionRefs.x === width / 2 && positionRefs.y < height / 2) {
    return 'North';
  }
  if (positionRefs.x < width / 2 && positionRefs.y === height / 2) {
    return 'West';
  }
  if (positionRefs.x === width / 2 && positionRefs.y > height / 2) {
    return null;
  }
  if (positionRefs.x > width / 2 && positionRefs.y === height / 2) {
    return 'East';
  }
  return null;
};
const tooltipHelperBottom = (positionRefs?: {
  height: number;
  width: number;
  x: number;
  y: number;
}) => {
  if (!positionRefs) {
    return null;
  }
  const {width, height} = Dimensions.get('window');
  if (positionRefs.x > width / 2 && positionRefs.y < height / 2) {
    return null;
  }
  if (positionRefs.x < width / 2 && positionRefs.y < height / 2) {
    return null;
  }
  if (positionRefs.x < width / 2 && positionRefs.y > height / 2) {
    return 'SouthWest';
  }
  if (positionRefs.x > width / 2 && positionRefs.y > height / 2) {
    return 'SouthEast';
  }
  if (positionRefs.x === width / 2 && positionRefs.y < height / 2) {
    return null;
  }
  if (positionRefs.x < width / 2 && positionRefs.y === height / 2) {
    return null;
  }
  if (positionRefs.x === width / 2 && positionRefs.y > height / 2) {
    return 'South';
  }
  if (positionRefs.x > width / 2 && positionRefs.y === height / 2) {
    return null;
  }
  return null;
};
export {tooltipHelperTop, tooltipHelperBottom};
