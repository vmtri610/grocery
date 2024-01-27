import {User} from "../../models/user.model";

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}
