import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { UserListContainer } from "./user-list/user-list.container";
import { UserNewContainer } from './user-new/user-new.container';
import { UserDetailsContainer } from './user-details/user-details.container';
import { UserEditContainer } from './user-edit/user-edit.container';

const routes: Routes = [
    {
        path: "",
        component: UserListContainer
    },
    {
        path: "new",
        component: UserNewContainer
    },
    {
        path: ':userId',
        component: UserDetailsContainer,
    },
    {
        path: ':userId/edit',
        component: UserEditContainer,
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class UserRoutingModule {
}
