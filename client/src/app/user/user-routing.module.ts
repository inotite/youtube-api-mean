import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { UserListContainer } from "./user-list/user-list.container";

const routes: Routes = [
    {
        path: "",
        component: UserListContainer
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class UserRoutingModule {
}
