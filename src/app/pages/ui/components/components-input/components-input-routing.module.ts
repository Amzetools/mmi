import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ComponentsInputComponent } from './components-input.component';


const routes: Routes = [
  {
    path: '',
    component: ComponentsInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ComponentsInputRoutingModule {
}
