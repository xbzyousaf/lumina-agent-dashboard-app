import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';
import { Caller } from 'app/models/caller';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Base } from 'app/models/base';
import { PaginatedResponse } from 'app/models/Pagination';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-callers',
  standalone: true,
  imports: [
     CommonModule,
     HttpClientModule,
     ReactiveFormsModule,
     RouterModule,
     FormsModule,
     MatTableModule,
     MatPaginatorModule,
     MatProgressSpinnerModule,
     MatButtonModule
  ],
  templateUrl: './callers.component.html',
  styleUrls: ['./callers.component.scss'],
  
})
export class CallersComponent implements OnInit {
 
  callers: Caller[] = [];
  paginate = new PaginatedResponse<Caller>();
  isLoading = false;
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'address', 'action'];
  dataSource = new MatTableDataSource<Caller>([]);
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCallers(this.paginate.current_page);
} 

  loadCallers(page: number): void {
    this.isLoading = true;
    this.apiService.get<Base<PaginatedResponse<Caller>>>(`callers?page=${page}`).subscribe({
      next: (res) => {
        this.dataSource.data = res.data.data;
        this.paginate.last_page = res.data.last_page;
        this.paginate.current_page = res.data.current_page;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading callers:', err);
        this.isLoading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginate.last_page) {
      this.loadCallers(page);
    }
  }

  paginationArray(c: number, l: number, s: number = 5): number[] {
    let start = Math.max(1, c - Math.floor(s / 2));
    let end = Math.min(l, start + s - 1);
    start = Math.max(1, end - s + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }


}
