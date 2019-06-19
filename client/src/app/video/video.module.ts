import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { VideoListComponent } from "./video-list.component";
import { VideoListContainer } from "./video-list.container";
import { VideoRoutingModule } from "./video-routing.module";

const MODULES = [
    SharedModule,
    VideoRoutingModule
];

const COMPONENTS: any = [
    VideoListComponent,
    VideoListContainer
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class VideoModule {
}
