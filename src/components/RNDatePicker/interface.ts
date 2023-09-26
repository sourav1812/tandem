export interface congratsModalProps {
  visible: boolean;
  renderModal: () => void;
  getMonthYear: (month: string, year: number) => void;
}
