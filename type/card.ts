export interface Card {
  _id: string;
  owner: string;
  url: string;
  gradientType: string;
  position: number[];
  backgroundColors: string[];
  QRColors: string[];
  points: number[];
  urlCode: string;
  angle: number;
}
