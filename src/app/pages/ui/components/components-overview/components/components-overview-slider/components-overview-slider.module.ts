import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsOverviewSliderComponent } from './components-overview-slider.component';
import { HighlightModule } from '../../../../../../../@vex/components/highlight/highlight.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [ComponentsOverviewSliderComponent],
  imports: [
    CommonModule,
    HighlightModule,
    MatTabsModule,
    MatSliderModule
  ],
  exports: [ComponentsOverviewSliderComponent]
})
export class ComponentsOverviewSliderModule {
}
