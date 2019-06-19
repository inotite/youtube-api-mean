import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

const MODULES = [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
    // LoginModule,
    // BeerModule
];

const COMPONENTS = [
    AppComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: MODULES,
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
