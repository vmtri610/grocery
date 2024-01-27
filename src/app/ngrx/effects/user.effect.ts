import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/user.service";
import * as UserActions from '../actions/user.action';
import {switchMap, of, from, map, catchError} from "rxjs";
import {User} from "../../models/user.model";

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  addUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.addUser),
      switchMap((action) => from(this.userService.addUser(action.user))),
      map(() => UserActions.addUserSuccess()),
      catchError((error) => {
        return of(UserActions.addUserFailure({error:error}))}
      )
    )
  );
}
