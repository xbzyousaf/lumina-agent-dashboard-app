import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallersComponent } from './callers.component';

describe('CallersComponent', () => {
  let component: CallersComponent;
  let fixture: ComponentFixture<CallersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CallersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
