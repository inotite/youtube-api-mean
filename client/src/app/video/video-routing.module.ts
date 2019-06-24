import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { VideoListContainer } from "./video-list/video-list.container";

const routes: Routes = [
    {
        path: "",
        component: VideoListContainer
    },
    {
        path: "new",
        component: VideoListContainer
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class VideoRoutingModule {
}
