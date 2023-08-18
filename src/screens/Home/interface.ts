import {ChildData} from '@tandem/redux/slices/createChild.slice';

export interface StateObject {
  changeUser: boolean;
  showTooltip: boolean;
  pseudoList: ChildData[];
}
