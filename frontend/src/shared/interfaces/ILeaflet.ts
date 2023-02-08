import { LatLngExpression } from 'leaflet';

export interface ILeaflet {
  type: string;
  coordinates: LatLngExpression;
  _id: string;
  description: string;
  day: number;
}
