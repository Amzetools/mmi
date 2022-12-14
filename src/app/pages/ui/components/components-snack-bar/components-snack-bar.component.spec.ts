import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentsSnackBarComponent } from './components-snack-bar.component';

describe('ComponentsSnackBarComponent', () => {
  let component: ComponentsSnackBarComponent;
  let fixture: ComponentFixture<ComponentsSnackBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsSnackBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
