import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';
import { SecondaryToolbarModule } from '../../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';


@NgModule({
  declarations: [BlankComponent],
  imports: [
    CommonModule,
    BlankRoutingModule,
    SecondaryToolbarModule,
  ]
})
export class BlankModule {
}
