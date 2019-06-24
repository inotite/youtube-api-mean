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
    map,
    mergeMap
} from "rxjs/operators";
import { Video } from "../../domain/video.model";
import { VideoService } from "../../service/video.service";
import * as VideoActions from "./video.action";
import * as RouterActions from "../router/router.action";
import { appRoutePaths } from "../../../app.routes";

@Injectable()
export class VideoEffect {
    /**
     * Load up some yummy brews.
     */
    @Effect()
    getVideos$: Observable<Action> = this.actions$.pipe(
        ofType<VideoActions.GetVideos>(VideoActions.VideoActionTypes.GetVideos),
        exhaustMap(() =>
            this.videoService.getAll().pipe(
                map((data: Video[]) => new VideoActions.GetVideosSuccess(data)),
                catchError((err: HttpErrorResponse) => of(new VideoActions.GetVideosFault(err.message)))
            )
        )
    );

    /**
     * Routes the user to the add Video flow.
     */
    @Effect()
    navigateToAdd$: Observable<Action> = this.actions$.pipe(
        ofType<VideoActions.NavigateToAdd>(VideoActions.VideoActionTypes.NavigateToAdd),
        mergeMap((action) => {
            console.log('AB');
            return [
                new RouterActions.Go({ path: appRoutePaths.video_add })
            ];
        })
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private videoService: VideoService) {
    }
}
