export interface NinjaData {
  name: string;
  weapon: string;
  age: number;
  color: string;
}

export interface NinjaInterface extends NinjaData {
  _id: number;
}
