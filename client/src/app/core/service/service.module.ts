import { NgModule } from "@angular/core";
import { ApiEndpointService } from "./api-endpoint.service";
import { BeerService } from "./beer.service";
import { VideoService } from './video.service';
import { UserService } from './user.service';
import { YoutubeService } from './youtube.service';

const PROVIDERS = [
    ApiEndpointService,
    BeerService,
    VideoService,
    UserService,
    YoutubeService
];

@NgModule({
    providers: PROVIDERS,
    declarations: []
})
export class ServiceModule {
}
