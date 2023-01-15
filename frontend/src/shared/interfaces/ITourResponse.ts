import { Tour } from '../models/Tour';
import { Observable } from 'rxjs';
export interface ITourResponse {
  data: {
    data: Observable<Tour>;
  };
}
