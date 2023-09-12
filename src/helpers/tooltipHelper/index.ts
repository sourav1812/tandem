import {DIRECTION_ARROWS} from '@tandem/constants/enums';
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
    return DIRECTION_ARROWS.NORTH_EAST;
  }
  if (positionRefs.x < width / 2 && positionRefs.y < height / 2) {
    return DIRECTION_ARROWS.NORTH_WEST;
  }
  if (positionRefs.x < width / 2 && positionRefs.y > height / 2) {
    return null;
  }
  if (positionRefs.x > width / 2 && positionRefs.y > height / 2) {
    return null;
  }
  if (positionRefs.x === width / 2 && positionRefs.y < height / 2) {
    return DIRECTION_ARROWS.NORTH;
  }
  if (positionRefs.x < width / 2 && positionRefs.y === height / 2) {
    return DIRECTION_ARROWS.WEST;
  }
  if (positionRefs.x === width / 2 && positionRefs.y > height / 2) {
    return null;
  }
  if (positionRefs.x > width / 2 && positionRefs.y === height / 2) {
    return DIRECTION_ARROWS.EAST;
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
    return DIRECTION_ARROWS.SOUTH_WEST;
  }
  if (positionRefs.x > width / 2 && positionRefs.y > height / 2) {
    return DIRECTION_ARROWS.SOUTH_EAST;
  }
  if (positionRefs.x === width / 2 && positionRefs.y < height / 2) {
    return null;
  }
  if (positionRefs.x < width / 2 && positionRefs.y === height / 2) {
    return null;
  }
  if (positionRefs.x === width / 2 && positionRefs.y > height / 2) {
    return DIRECTION_ARROWS.SOUTH;
  }
  if (positionRefs.x > width / 2 && positionRefs.y === height / 2) {
    return null;
  }
  return null;
};
export {tooltipHelperTop, tooltipHelperBottom};
