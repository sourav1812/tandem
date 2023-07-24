export interface SignoutModalProps {
  visible: boolean;
  renderModal: () => void;
  nextClick: () => void;
  heading: string;
  content: string;
}
