import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PaginatedResponse } from 'app/models/Pagination';
import { Ticket } from 'app/models/ticket';
import { Base } from 'app/models/base';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedColumns: string[] = ['subject', 'caller', 'agent', 'action'];

  loading = false;

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getActiveTickets(this.currentPage, this.pageSize);
  }

  getActiveTickets(page: number = 0, size: number = this.pageSize): void {
    this.loading = true;
    const apiPage = page + 1; // Convert to 1-based index if needed

    this.apiService.get<Base<PaginatedResponse<Ticket>>>(`tickets?page=${apiPage}&limit=${size}`).subscribe({
      next: (res) => {
        this.tickets = res.data.data;
        this.totalItems = res.data.total;
        this.currentPage = res.data.current_page - 1;
        this.loading = false;
        console.log('Tickets loaded:', this.tickets);
      },
      error: (err) => {
        console.error('Error loading tickets:', err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getActiveTickets(this.currentPage, this.pageSize);
  }
}
