import {
    Component,
    OnInit
} from "@angular/core";
import {
    select,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import { Video } from "../../core/domain/video.model";
import * as fromState from "../../core/state";
import * as VideoAction from "../../core/state/video/video.action";
import { Router } from '@angular/router';

@Component({
    selector: "blog-video-list-container",
    templateUrl: "./video-list.container.html"
})
export class VideoListContainer implements OnInit {
    /**
     * The username for the currently logged in user.
     */
    public videos$: Observable<Video[]>;

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>, private router: Router) {
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        this.videos$ = this.store$.pipe(select(fromState.selectAllVideo));
        this.store$.dispatch(new VideoAction.GetVideos());
    }

    public onAddVideo(event$: any) {
        console.log("VIDEO: Container: onAddVideo()");
        this.store$.dispatch(new VideoAction.NavigateToAdd());
    }
}
