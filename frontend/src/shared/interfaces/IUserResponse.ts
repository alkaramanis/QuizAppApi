import { User } from '../models/User';
export interface IUserResponse {
  data: {
    user: User;
  };
}
