import { Action } from "@ngrx/store";
import { User } from "../../domain/user.model";

export enum UserActionTypes {
    GetUsers = "[User] GetUsers",
    GetUsersSuccess = "[User] GetUsersSuccess",
    GetUsersFault = "[User] GetUsersFault",

    Select = "[User] Select",
    Add = "[User] Add",
    Update = "[User] Update",
    Delete = "[User] Delete",
}

export class GetUsers implements Action {
    readonly type = UserActionTypes.GetUsers;

    constructor() {
    }
}

export class GetUsersSuccess implements Action {
    readonly type = UserActionTypes.GetUsersSuccess;

    constructor(public payload: User[]) {
    }
}

export class GetUsersFault implements Action {
    readonly type = UserActionTypes.GetUsersFault;

    constructor(public errorMessage: string) {
    }
}

export class Select implements Action {
    readonly type = UserActionTypes.Select;

    constructor(public payload: string) {
    }
}

export class Add implements Action {
    readonly type = UserActionTypes.Add;

    constructor(public payload: User) {
    }
}

export class Update implements Action {
    readonly type = UserActionTypes.Update;

    constructor(public payload: User) {
    }
}

export class Delete implements Action {
    readonly type = UserActionTypes.Delete;

    constructor(public payload: User) {
    }
}

export type UserActions =
    | GetUsers
    | GetUsersSuccess
    | GetUsersFault
    | Select
    | Add
    | Update
    | Delete
    ;
