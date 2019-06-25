import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { VideoListContainer } from "./video-list/video-list.container";
import { VideoNewContainer } from './video-new/video-new.container';
import { VideoDetailsContainer } from './video-details/video-details.container';

const routes: Routes = [
    {
        path: "",
        component: VideoListContainer
    },
    {
        path: "new",
        component: VideoNewContainer
    },
    {
        path: ":videoId",
        component: VideoDetailsContainer
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class VideoRoutingModule {
}
