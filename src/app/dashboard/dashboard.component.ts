import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PaginatedResponse } from 'app/models/Pagination';
import { Ticket } from 'app/models/ticket';
import {Base } from 'app/models/base';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[]=[];
  
  paginated = new PaginatedResponse<Ticket>();
  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getActiveTickets();
  }

  getActiveTickets(page: number = 1): void {
    this.loading = true;
    this.apiService.get<Base<PaginatedResponse<Ticket>>>(`tickets?page=${page}`).subscribe({
      next: (res) => {
        
        this.tickets = res.data.data;
        this.paginated.current_page = res.data.current_page;
        this.paginated.last_page = res.data.last_page;

        this.loading = false;
        console.log("ticket:", this.tickets);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading tickets', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginated.last_page) {
      this.getActiveTickets(page);
    }
  }
  paginationArray(lastPage: number): number[] {
  return Array.from({ length: lastPage }, (_, i) => i + 1);
}

}
