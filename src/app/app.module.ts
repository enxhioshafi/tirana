import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectComponent} from './components/project/project.component';
import {HttpClientModule} from '@angular/common/http';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {RouterModule} from "@angular/router";
import { PopupComponent } from './components/popup/popup.component';
import { ContactFormComponent } from './components/popup/add-project/contact-form.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectInfoComponent,
    PopupComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
