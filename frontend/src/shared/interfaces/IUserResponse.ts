import { User } from '../models/User';
export interface IUserResponse {
  data: {
    data: User;
  };
}
