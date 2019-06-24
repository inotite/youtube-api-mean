import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { UserListComponent } from "./user-list/user-list.component";
import { UserListContainer } from "./user-list/user-list.container";
import { UserRoutingModule } from "./user-routing.module";
import { UserNewContainer } from './user-new/user-new.container';
import { UserDetailsContainer } from './user-details/user-details.container';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditContainer } from './user-edit/user-edit.container';

const MODULES = [
    SharedModule,
    UserRoutingModule
];

const COMPONENTS: any = [
    UserListComponent,
    UserListContainer,
    UserNewContainer,
    UserDetailsComponent,
    UserDetailsContainer,
    UserEditContainer
];

@NgModule({
    imports: MODULES,
    exports: COMPONENTS,
    declarations: COMPONENTS
})
export class UserModule {
}
