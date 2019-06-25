import {
    Component,
    OnInit,
} from "@angular/core";
import {
    select,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import { Video } from "../../core/domain/video.model";
import * as fromState from "../../core/state";
import * as VideoActions from "../../core/state/video/video.action";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'blog-video-details-container',
  templateUrl: './video-details.container.html',
})
export class VideoDetailsContainer implements OnInit {
  
    public video$: Observable<Video>;

    constructor(private store$: Store<any>, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.video$ = this.store$.pipe(select(fromState.selectCurrentVideo));

        this.activatedRoute.params.subscribe(params => {
            console.log(params);
            this.store$.dispatch(new VideoActions.Select(params.videoId));
        })
    }

    /**
     * Switch to register view.
     */

    editVideo(video: Video) {
        this.store$.dispatch(new VideoActions.SelectCurrentVideo(video._id));
        this.router.navigate(['/video', video._id, 'edit']);
    }

    deleteVideo(video: Video) {

    }
}