export interface colorPaletteType {
  tooltipVisible: boolean;
  onTooltipClose: () => void;
}
export interface StateObject {
  colorPalette: {firstColor: string; secondColor: string}[];
  color1: string;
  color2: string;
}
