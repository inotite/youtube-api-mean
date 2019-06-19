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
import { Video } from "../../domain/video.model";
import { VideoService } from "../../service/video.service";
import {
    VideoActionTypes,
    GetVideos,
    GetVideosFault,
    GetVideosSuccess
} from "./video.action";

@Injectable()
export class VideoEffect {
    /**
     * Load up some yummy brews.
     */
    @Effect()
    getVideos$: Observable<Action> = this.actions$.pipe(
        ofType<GetVideos>(VideoActionTypes.GetVideos),
        exhaustMap(() =>
            this.videoService.getAll().pipe(
                map((data: Video[]) => new GetVideosSuccess(data)),
                catchError((err: HttpErrorResponse) => of(new GetVideosFault(err.message)))
            )
        )
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private videoService: VideoService) {
    }
}
