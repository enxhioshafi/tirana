import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectComponent} from './components/project/project.component';
import {HttpClientModule} from '@angular/common/http';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectInfoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
