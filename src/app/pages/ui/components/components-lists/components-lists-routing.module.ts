import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ComponentsListsComponent } from './components-lists.component';


const routes: Routes = [
  {
    path: '',
    component: ComponentsListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ComponentsListsRoutingModule {
}
