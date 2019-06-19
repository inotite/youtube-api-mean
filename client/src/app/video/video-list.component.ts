import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    ViewChild
} from "@angular/core";
import { Video } from "../core/domain/video.model";

import { trackByFn } from "../util/angular.util";
import { MatPaginator, MatTableDataSource } from '@angular/material';
   
  const ELEMENT_DATA: Video[] = [
    {id: "1", name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {id: "1", name: 'Helium', weight: 4.0026, symbol: 'He'},
    {id: "1", name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {id: "1", name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {id: "1", name: 'Boron', weight: 10.811, symbol: 'B'},
    {id: "1", name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {id: "1", name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {id: "1", name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {id: "1", name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {id: "1", name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

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
    public videos: Video[];

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<Video>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Used to track items in the ngFor for better performance.
     */
    public trackVideo: Function = trackByFn;

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }
}
