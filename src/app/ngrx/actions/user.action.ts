import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const addUser = createAction('[User] Add User', props<{user: User}>());
export const addUserSuccess = createAction('[User] Add User Success');
export const addUserFailure = createAction('[User] Add User Failure', props<{error: string}>());
