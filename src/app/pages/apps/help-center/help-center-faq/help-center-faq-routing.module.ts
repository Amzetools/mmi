import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { HelpCenterFaqComponent } from './help-center-faq.component';


const routes: Routes = [
  {
    path: '',
    component: HelpCenterFaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class HelpCenterFaqRoutingModule {
}
