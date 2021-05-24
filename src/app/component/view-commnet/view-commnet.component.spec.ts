import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommnetComponent } from './view-commnet.component';

describe('ViewCommnetComponent', () => {
  let component: ViewCommnetComponent;
  let fixture: ComponentFixture<ViewCommnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
