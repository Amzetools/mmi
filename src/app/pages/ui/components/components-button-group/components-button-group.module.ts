import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsButtonGroupRoutingModule } from './components-button-group-routing.module';
import { ComponentsButtonGroupComponent } from './components-button-group.component';
import { PageLayoutModule } from '../../../../../@vex/components/page-layout/page-layout.module';
import {
  ComponentsOverviewButtonGroupModule
} from '../components-overview/components/components-overview-button-group/components-overview-button-group.module';
import { SecondaryToolbarModule } from '../../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../../../@vex/components/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [ComponentsButtonGroupComponent],
  imports: [
    CommonModule,
    ComponentsButtonGroupRoutingModule,
    PageLayoutModule,
    ComponentsOverviewButtonGroupModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
  ]
})
export class ComponentsButtonGroupModule {
}
