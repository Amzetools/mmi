import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageLayoutSimpleLargeHeaderComponent } from './page-layout-simple-large-header.component';

describe('PageLayoutSimpleLargeHeaderComponent', () => {
  let component: PageLayoutSimpleLargeHeaderComponent;
  let fixture: ComponentFixture<PageLayoutSimpleLargeHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PageLayoutSimpleLargeHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutSimpleLargeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
