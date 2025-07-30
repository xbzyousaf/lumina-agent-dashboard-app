import { Base } from 'app/models/base';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'app/models/ticket';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-dashborad-ticket-form',
  templateUrl: './dashborad-ticket-form.component.html',
  styleUrls: ['./dashborad-ticket-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule,MatFormFieldModule,MatInputModule]
})
export class DashboradTicketFormComponent implements OnInit {
  form: FormGroup;
  ticket!: Ticket;
  id!: number;
  isLoading = false;


    statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Forwarded', value: 'forwarded' },
    { label: 'Escalated', value: 'escalated' }
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.id = +params.get('id')!;
    this.loadTicket();
});

  }

  loadTicket() {
       this.isLoading = true;

    this.api.get<Base<Ticket>>(`tickets/${this.id}`).subscribe({
      next: (res) => {
        this.ticket = res.data;
       
        this.form.patchValue({
          subject: this.ticket.subject,
          status: this.ticket.status,
          description: this.ticket?.description ?? ''
        });
        this.isLoading=false
      },
      error: (err) => {
        this.isLoading=false;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.api.update(`ticket/${this.id}`, this.form.value).subscribe({
      next: () => {
        alert('Ticket updated successfully');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
      }
    });
  } 

}

