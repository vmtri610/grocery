import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success');
export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: string }>(),
);

export const storeUserId = createAction(
  '[User] Store User Id',
  props<{ userId: string }>(),
);
export const deleteUserInStore = createAction('[User] Delete User In Store');
export const loadUser = createAction('[User] Delete User In Store Success');
export const loadUserSuccess = createAction(
  '[User] Delete User In Store Failure',
);
