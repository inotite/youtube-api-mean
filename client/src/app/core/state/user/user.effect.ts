import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    Actions,
    Effect,
    ofType
} from "@ngrx/effects";
import {
    Action,
    Store
} from "@ngrx/store";
import {
    Observable,
    of,
    merge
} from "rxjs";
import {
    catchError,
    exhaustMap,
    map,
    mergeMap
} from "rxjs/operators";
import { appRoutePaths } from "../../../app.routes";
import { User } from "../../domain/user.model";
import { UserService } from "../../service/user.service";
import * as RouterActions from "../router/router.action";
import * as UserActions from "./user.action";

@Injectable()
export class UserEffect {
    /**
     * Get all Users
     */
    @Effect()
    getUsers$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.GetUsers>(UserActions.UserActionTypes.GetUsers),
        exhaustMap(() =>
            this.userService.getAll().pipe(
                map((data: User[]) => new UserActions.GetUsersSuccess(data)),
                catchError((err: HttpErrorResponse) => of(new UserActions.GetUsersFault(err.message)))
            )
        )
    );

    @Effect()
    getUser$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.Select>(UserActions.UserActionTypes.Select),
        map(action => action.payload),
        exhaustMap((_id) => this.userService.getOne(_id).pipe(
                mergeMap((user: User) => [
                    new UserActions.SelectSuccess(user),
                ]),
                catchError((err: HttpErrorResponse) => of(new UserActions.Failure({ concern: 'SELECT', error: err.message})))
            )
        )
    );

    @Effect()
    updateUser$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.Update>(UserActions.UserActionTypes.Update),
        map(action => action.payload),
        exhaustMap((user) => this.userService.updateOne(user).pipe(
                mergeMap((user: User) => [
                    new UserActions.UpdateSuccess(user),
                    new RouterActions.Go({ path: appRoutePaths.user })
                ]),
                catchError((err: HttpErrorResponse) => of(new UserActions.Failure({ concern: 'UPDATE', error: err.message})))
            )
        )
    );

    @Effect()
    deleteUser$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.Delete>(UserActions.UserActionTypes.Delete),
        map(action => action.payload),
        exhaustMap((_id) => this.userService.deleteOne(_id).pipe(
                mergeMap((_id: any) => [
                    new UserActions.DeleteSuccess(_id),
                    new RouterActions.Go({ path: appRoutePaths.user })
                ]),
                catchError((err: HttpErrorResponse) => of(new UserActions.Failure({ concern: 'DELETE', error: err.message})))
            )
        )
    );

    /**
     * Add User
     */
    @Effect()
    addUser$ = this.actions$.pipe(
        ofType<UserActions.Add>(UserActions.UserActionTypes.Add),
        map(action  => action.payload),
        exhaustMap( user => this.userService.add(user).pipe(
            mergeMap( (createdUser: User) => [
                new UserActions.AddSuccess(createdUser),
                new RouterActions.Back()
            ]),
            catchError(err => {
                // alert(err.message);
                return of(new UserActions.Failure({concern: 'CREATE', error: err}));
            })
        )),
    );

    /**
     * Routes the user to the add User flow.
     */
    @Effect()
    navigateToAdd$: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.NavigateToAdd>(UserActions.UserActionTypes.NavigateToAdd),
        mergeMap((action) => {
            console.log('A');
            return [
                new RouterActions.Go({ path: appRoutePaths.user_add })
            ];
        })
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private userService: UserService) {
    }
}
