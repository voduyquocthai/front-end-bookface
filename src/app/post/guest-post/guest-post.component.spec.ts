import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPostComponent } from './guest-post.component';

describe('GuestPostComponent', () => {
  let component: GuestPostComponent;
  let fixture: ComponentFixture<GuestPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
