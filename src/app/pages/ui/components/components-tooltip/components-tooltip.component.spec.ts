import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentsTooltipComponent } from './components-tooltip.component';

describe('ComponentsTooltipComponent', () => {
  let component: ComponentsTooltipComponent;
  let fixture: ComponentFixture<ComponentsTooltipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsTooltipComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
