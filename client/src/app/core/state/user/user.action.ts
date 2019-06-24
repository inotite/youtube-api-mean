import { Action } from "@ngrx/store";
import { User } from "../../domain/user.model";

export enum UserActionTypes {
    GetUsers = "[User] GetUsers",
    GetUsersSuccess = "[User] GetUsersSuccess",
    GetUsersFault = "[User] GetUsersFault",

    Select = "[User] Select",
    SelectSuccess = "[User] SelectSucces",

    SelectCurrentUser = "[User] SelectCurrentUser",

    Add = "[User] Add",
    AddSuccess = "[User] AddSuccess",

    Update = "[User] Update",
    UpdateSuccess = "[User] UpdateSuccess",

    Delete = "[User] Delete",
    DeleteSuccess = "[User] DeleteSuccess",

    NavigateToAdd = "[User] NavigateToAdd",
    
    FAILURE = "[User] FAILURE"
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

export class SelectCurrentUser implements Action {
    readonly type = UserActionTypes.SelectCurrentUser;

    constructor(public payload: string) {
    }
}

export class Select implements Action {
    readonly type = UserActionTypes.Select;

    constructor(public payload: string) {
    }
}

export class SelectSuccess implements Action {
    readonly type = UserActionTypes.SelectSuccess;

    constructor(public payload: User) {

    }
}

export class Add implements Action {
    readonly type = UserActionTypes.Add;

    constructor(public payload: User) {
    }
}

export class AddSuccess implements Action {
    readonly type = UserActionTypes.AddSuccess;

    constructor(public payload: User) {

    }
}

export class Update implements Action {
    readonly type = UserActionTypes.Update;

    constructor(public payload: User) {
    }
}

export class UpdateSuccess implements Action {
    readonly type = UserActionTypes.UpdateSuccess;

    constructor(public payload: User) {

    }
}

export class Delete implements Action {
    readonly type = UserActionTypes.Delete;

    constructor(public payload: string) {
    }
}

export class DeleteSuccess implements Action {
    readonly type = UserActionTypes.DeleteSuccess;
    
    constructor(public payload: string) {

    }
}

export class NavigateToAdd implements Action {
    readonly type = UserActionTypes.NavigateToAdd;

    constructor() {
    }
}

export class Failure implements Action {
  readonly type = UserActionTypes.FAILURE;
  constructor(public payload: {concern: 'CREATE' | 'PATCH' | 'SELECT' | 'UPDATE' | 'DELETE', error: any}) {}
}

export type UserActions =
    | GetUsers
    | GetUsersSuccess
    | GetUsersFault
    | Select
    | Add
    | Update
    | Delete
    | NavigateToAdd
    | AddSuccess
    | Failure
    | SelectSuccess
    | UpdateSuccess
    | SelectCurrentUser
    | DeleteSuccess
    ;
