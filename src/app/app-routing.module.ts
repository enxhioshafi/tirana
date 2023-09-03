import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {ProjectComponent} from "./components/project/project.component";
import { TaskDetailComponent } from './task-detail/task-detail.component';



const routes: Routes = [
  {path: '', component: ProjectComponent},
  {path: 'project-info/:id', component: ProjectInfoComponent},
  {path: 'task-detail/:taskId', component: TaskDetailComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

