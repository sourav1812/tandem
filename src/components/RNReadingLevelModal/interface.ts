export interface ReadingTipsModalProps {
  visible: boolean;
  renderModal: () => void;
  nextClick: () => void;
  setVissible?: React.Dispatch<React.SetStateAction<boolean>>;
  bookLength: number;
}
