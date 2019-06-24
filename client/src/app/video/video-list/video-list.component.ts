import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewChild,
    Output,
    EventEmitter
} from "@angular/core";
import { Video } from "../../core/domain/video.model";

import { trackByFn } from "../../util/angular.util";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
   
@Component({
    selector: "blog-video-list",
    templateUrl: "./video-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnInit {

    /**
     * List of videos to display.
     */
    @Input()
    public videos: Observable<Video[]>;

    @Output()
    public addVideo: EventEmitter<void> = new EventEmitter<void>();

    displayedColumns: string[] = ['id', 'name', 'snippet', 'contentDetails', 'status', 'statistics', 'control'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public dataSource;

    /**
     * Used to track items in the ngFor for better performance.
     */
    public trackVideo: Function = trackByFn;

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        this.videos.subscribe(videos => {
          this.dataSource = new MatTableDataSource<Video>(videos);
          this.dataSource.paginator = this.paginator;
        })
    }

    public onAddVideo($event) {
        console.log(`VIDEO: onAddVideo()`);
        this.addVideo.emit($event);
    }
}
