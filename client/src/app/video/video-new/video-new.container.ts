import { Component, OnInit } from '@angular/core';
import { Video } from '../../core/domain/video.model';
import { Store } from '@ngrx/store';
import * as VideoActions from "../../core/state/video/video.action";

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.container.html',
  styleUrls: ['./video-new.container.scss']
})
export class VideoNewContainer implements OnInit {

  constructor(private store$: Store<any>) { }

  ngOnInit() {
  }

  submitted(video: Video) {
    this.store$.dispatch(new VideoActions.Add(video));
  }

}
