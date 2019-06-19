import { Action } from "@ngrx/store";
import { Video } from "../../domain/video.model";

export enum VideoActionTypes {
    GetVideos = "[Video] GetVideos",
    GetVideosSuccess = "[Video] GetVideosSuccess",
    GetVideosFault = "[Video] GetVideosFault",

    Select = "[Video] Select",
    Add = "[Video] Add",
    Update = "[Video] Update",
    Delete = "[Video] Delete",
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

export class Select implements Action {
    readonly type = VideoActionTypes.Select;

    constructor(public payload: string) {
    }
}

export class Add implements Action {
    readonly type = VideoActionTypes.Add;

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

    constructor(public payload: Video) {
    }
}

export type VideoActions =
    | GetVideos
    | GetVideosSuccess
    | GetVideosFault
    | Select
    | Add
    | Update
    | Delete
    ;
