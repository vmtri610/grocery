import { User } from '../../models/user.model';

export interface UserState {
  userId: string;
  user: User;
  isLoading: boolean;
  error: string;
}
