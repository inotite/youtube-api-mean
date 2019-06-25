import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { VideoListComponent } from "./video-list/video-list.component";
import { VideoListContainer } from "./video-list/video-list.container";
import { VideoRoutingModule } from "./video-routing.module";
import { VideoNewContainer } from './video-new/video-new.container';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoDetailsContainer } from './video-details/video-details.container';

const MODULES = [
    SharedModule,
    VideoRoutingModule
];

const COMPONENTS: any = [
    VideoListComponent,
    VideoListContainer,
    VideoNewContainer,
    VideoDetailsComponent,
    VideoDetailsContainer
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class VideoModule {
}
