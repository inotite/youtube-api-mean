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

    public onAddVideo($event: any) {
        console.log("VIDEO: Container: onAddVideo()");
        this.store$.dispatch(new VideoAction.NavigateToAdd());
    }

    public deleteVideo(video: Video) {
        console.log("VIDEO: Container: deleteVideo()");
        if (confirm('Are you sure?'))
            this.store$.dispatch(new VideoAction.Delete(video._id));
    }

    public showDetails(video: Video) {
        console.log("VIDEO: Container: showDetails()");
        this.store$.dispatch(new VideoAction.Select(video._id));
        this.router.navigate(['/video', video._id]);
    }
}
