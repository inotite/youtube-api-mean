import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
    FormsModule,
    ReactiveFormsModule
} from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UserFormComponent } from './form/user-form/user-form.component';

const MODULES = [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd Party Modules
    // MomentModule,

    // Application Shared Feature Modules
    MaterialModule,
];

@NgModule({
    imports: MODULES,
    exports: [ MODULES, HeaderComponent, SidenavListComponent ],
    declarations: [HeaderComponent, SidenavListComponent, UserFormComponent]
})
export class SharedModule {
}
