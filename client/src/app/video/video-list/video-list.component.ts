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
    styleUrls: ['./video-list.component.scss'],
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
    @Output()
    public remove: EventEmitter<Video> = new EventEmitter<Video>();
    @Output()
    public edit: EventEmitter<Video> = new EventEmitter<Video>();
    @Output()
    public show: EventEmitter<Video> = new EventEmitter<Video>();

    displayedColumns: string[] = ['video_id', 'title', 'description', 'tags', 'total_views', 'likes', 'dislikes'];
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
        if ( JSON.parse(localStorage.getItem("token")).role[0] == "ADMIN" )
            this.displayedColumns.push('control');
        this.videos.subscribe(videos => {
            for (let video of videos ) {
                let str = new String(video.description);
                if (str.length > 30)
                    video.description = video.description.slice(0, 30) + '...';
                str = new String(video.tags);
                if (str.length > 30)
                    video.tags = video.tags.slice(0, 30) + '...';
            }
            this.dataSource = new MatTableDataSource<Video>(videos);
            this.dataSource.paginator = this.paginator;
        })
    }

    public onAddVideo($event) {
        console.log(`VIDEO: onAddVideo()`);
        this.addVideo.emit($event);
    }

    public deleteVideo(video: Video) {
        console.log(`VIDEO: deleteVideo()`);
        this.remove.emit(video);
    }

    public showDetails(video: Video) {
        console.log(`VIDEO: showDetails()`);
        this.show.emit(video);
    }
}
