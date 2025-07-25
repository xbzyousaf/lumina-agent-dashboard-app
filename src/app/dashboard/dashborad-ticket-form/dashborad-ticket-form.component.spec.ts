import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradTicketFormComponent } from './dashborad-ticket-form.component';

describe('DashboradTicketFormComponent', () => {
  let component: DashboradTicketFormComponent;
  let fixture: ComponentFixture<DashboradTicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboradTicketFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboradTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
