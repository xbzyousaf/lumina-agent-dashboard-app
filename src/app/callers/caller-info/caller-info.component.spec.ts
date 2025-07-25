import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallerInfoComponent } from './caller-info.component';

describe('CallerInfoComponent', () => {
  let component: CallerInfoComponent;
  let fixture: ComponentFixture<CallerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CallerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
