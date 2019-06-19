import { NgModule } from "@angular/core";
import { ApiEndpointService } from "./api-endpoint.service";
import { BeerService } from "./beer.service";
import { VideoService } from './video.service';
import { UserService } from './user.service';

const PROVIDERS = [
    ApiEndpointService,
    BeerService,
    VideoService,
    UserService
];

@NgModule({
    providers: PROVIDERS,
    declarations: []
})
export class ServiceModule {
}
