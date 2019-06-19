import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { UserListComponent } from "./user-list/user-list.component";
import { UserListContainer } from "./user-list/user-list.container";
import { UserRoutingModule } from "./user-routing.module";

const MODULES = [
    SharedModule,
    UserRoutingModule
];

const COMPONENTS: any = [
    UserListComponent,
    UserListContainer
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class UserModule {
}
