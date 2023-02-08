import { LatLngExpression } from 'leaflet';
import { Reviews } from './Reviews';
import { ILeaflet } from '../interfaces/ILeaflet';
enum difficulty {
  easy = 'Easy',
  medium = 'Medium',
  difficult = 'difficult',
}

export class Tour {
  public name!: string;
  public ratingsAverage: number;
  public difficulty: difficulty;
  public ratingsQuantity: number;
  public price!: number;
  public summary!: string;
  public description: string;
  public imageCover!: string;
  public id!: string;
  public images: string[];
  public locations: ILeaflet[];
  public startLocation: ILeaflet[];
  public reviews: Reviews[];
}
