export interface IndicatorType {
  index: number;
  isSelected: boolean;
}

export interface ChildProfileStateObject {
  bulletinArray: IndicatorType[];
  questionIndex: number;
  gender: string;
  imagePickerUrl: string | null;
  showImageModal: boolean;
  showRoles: boolean;
}
