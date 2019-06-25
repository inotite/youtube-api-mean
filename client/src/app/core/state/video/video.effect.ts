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

    @Effect()
    getVideo$: Observable<Action> = this.actions$.pipe(
        ofType<VideoActions.Select>(VideoActions.VideoActionTypes.Select),
        map(action => action.payload),
        exhaustMap((_id) => this.videoService.getOne(_id).pipe(
                mergeMap((video: Video) => [
                    new VideoActions.SelectSuccess(video),
                ]),
                catchError((err: HttpErrorResponse) => of(new VideoActions.Failure({ concern: 'SELECT', error: err.message})))
            )
        )
    );

    /**
     * Add User
     */
    @Effect()
    addVideo$ = this.actions$.pipe(
        ofType<VideoActions.Add>(VideoActions.VideoActionTypes.Add),
        map(action  => action.payload),
        exhaustMap( video => this.videoService.addOne(video).pipe(
            mergeMap( (createdVideo: Video) => [
                new VideoActions.AddSuccess(createdVideo),
                new RouterActions.Back()
            ]),
            catchError(err => {
                // alert(err.message);
                return of(new VideoActions.Failure({concern: 'CREATE', error: err}));
            })
        )),
    );

    @Effect()
    deleteVideo$: Observable<Action> = this.actions$.pipe(
        ofType<VideoActions.Delete>(VideoActions.VideoActionTypes.Delete),
        map(action => action.payload),
        exhaustMap((_id) => this.videoService.deleteOne(_id).pipe(
                mergeMap((_id: any) => [
                    new VideoActions.DeleteSuccess(_id),
                    new RouterActions.Go({ path: appRoutePaths.video })
                ]),
                catchError((err: HttpErrorResponse) => of(new VideoActions.Failure({ concern: 'DELETE', error: err.message})))
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
