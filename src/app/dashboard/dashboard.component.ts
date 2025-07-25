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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource<Ticket>([]);
  displayedColumns: string[] = ['id', 'subject', 'caller', 'agent', 'action'];

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
        this.dataSource.data = this.tickets; // Update mat-table data source
        this.paginated.current_page = res.data.current_page;
        this.paginated.last_page = res.data.last_page;
        this.loading = false;
        console.log('ticket:', this.tickets);
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
