import { UserState } from '../states/user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { User } from '../../models/user.model';

const initialState: UserState = {
  userId: '',
  user: <User>{},
  isLoading: false,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.addUserSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
  })),

  on(UserActions.storeUserId, (state, { userId }) => ({
    ...state,
    userId: userId,
  })),
);
