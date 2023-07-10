import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {ProjectComponent} from "./components/project/project.component";


const routes: Routes = [
  {path: '', component: ProjectComponent },
  {path:'project-info', component: ProjectInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

