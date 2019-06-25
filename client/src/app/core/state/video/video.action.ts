import { Action } from "@ngrx/store";
import { Video } from "../../domain/video.model";

export enum VideoActionTypes {
    GetVideos = "[Video] GetVideos",
    GetVideosSuccess = "[Video] GetVideosSuccess",
    GetVideosFault = "[Video] GetVideosFault",

    Select = "[Video] Select",
    SelectSuccess = "[Video] SelectSucces",

    SelectCurrentVideo = "[Video] SelectCurrentVideo",

    Add = "[Video] Add",
    AddSuccess = "[Video] AddSuccess",

    Update = "[Video] Update",

    Delete = "[Video] Delete",
    DeleteSuccess = "[Video] DeleteSuccess",

    NavigateToAdd = "[Video] NavigateToAdd",

    FAILURE = "[Video] FAILURE",
}

export class GetVideos implements Action {
    readonly type = VideoActionTypes.GetVideos;

    constructor() {
    }
}

export class GetVideosSuccess implements Action {
    readonly type = VideoActionTypes.GetVideosSuccess;

    constructor(public payload: Video[]) {
    }
}

export class GetVideosFault implements Action {
    readonly type = VideoActionTypes.GetVideosFault;

    constructor(public errorMessage: string) {
    }
}

export class SelectCurrentVideo implements Action {
    readonly type = VideoActionTypes.SelectCurrentVideo;

    constructor(public payload: string) {
    }
}

export class Select implements Action {
    readonly type = VideoActionTypes.Select;

    constructor(public payload: string) {
    }
}

export class SelectSuccess implements Action {
    readonly type = VideoActionTypes.SelectSuccess;

    constructor(public payload: Video) {

    }
}

export class Add implements Action {
    readonly type = VideoActionTypes.Add;

    constructor(public payload: Video) {
    }
}

export class AddSuccess implements Action {
    readonly type = VideoActionTypes.AddSuccess;

    constructor(public payload: Video) {
    }
}

export class Update implements Action {
    readonly type = VideoActionTypes.Update;

    constructor(public payload: Video) {
    }
}

export class Delete implements Action {
    readonly type = VideoActionTypes.Delete;

    constructor(public payload: string) {
    }
}

export class DeleteSuccess implements Action {
    readonly type = VideoActionTypes.DeleteSuccess;

    constructor(public payload: string) {

    }
}

export class NavigateToAdd implements Action {
    readonly type = VideoActionTypes.NavigateToAdd;

    constructor() {
    }
}

export class Failure implements Action {
  readonly type = VideoActionTypes.FAILURE;
  constructor(public payload: {concern: 'CREATE' | 'PATCH' | 'SELECT' | 'UPDATE' | 'DELETE', error: any}) {}
}

export type VideoActions =
    | GetVideos
    | GetVideosSuccess
    | GetVideosFault
    | Select
    | Add
    | Update
    | Delete
    | NavigateToAdd
    | AddSuccess
    | Failure
    | DeleteSuccess
    | SelectSuccess
    | SelectCurrentVideo
    ;
