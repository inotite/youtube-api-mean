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
    of
} from "rxjs";
import {
    catchError,
    exhaustMap,
    map
} from "rxjs/operators";
import { User } from "../../domain/user.model";
import { UserService } from "../../service/user.service";
import {
    UserActionTypes,
    GetUsers,
    GetUsersFault,
    GetUsersSuccess
} from "./user.action";

@Injectable()
export class UserEffect {
    /**
     * Load up some yummy brews.
     */
    @Effect()
    getUsers$: Observable<Action> = this.actions$.pipe(
        ofType<GetUsers>(UserActionTypes.GetUsers),
        exhaustMap(() =>
            this.userService.getAll().pipe(
                map((data: User[]) => new GetUsersSuccess(data)),
                catchError((err: HttpErrorResponse) => of(new GetUsersFault(err.message)))
            )
        )
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private userService: UserService) {
    }
}
