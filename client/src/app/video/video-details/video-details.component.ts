import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Video } from 'src/app/core/domain/video.model';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoDetailsComponent implements OnInit {

  @Input()
  public video: Video;

  @Output()
  public edit: EventEmitter<Video> = new EventEmitter<Video>();
  @Output()
  public remove: EventEmitter<Video> = new EventEmitter<Video>();

  constructor() { }

  ngOnInit() {
  }

}
