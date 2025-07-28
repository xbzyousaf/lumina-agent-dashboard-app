import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { ApiService } from 'app/services/api.service';
import { Caller } from 'app/models/caller';
import { PaginatedResponse } from 'app/models/Pagination';
import { Base } from 'app/models/base';

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
    MatButtonModule,
  ],
  templateUrl: './callers.component.html',
  styleUrls: ['./callers.component.scss'],
})
export class CallersComponent implements OnInit {
  dataSource: Caller[] = [];
  displayedColumns: string[] = ['fullName', 'phone', 'email', 'address', 'action'];
  isLoading = false;

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCallers(this.currentPage, this.pageSize);
  }

loadCallers(page: number, size: number): void {
  this.isLoading = true;
  const apiPage = page + 1;

  console.log(`Loading page ${apiPage} from API`);

  this.apiService.get<Base<PaginatedResponse<Caller>>>(`callers?page=${apiPage}&limit=${size}`).subscribe({
    next: (res) => {
      this.dataSource = [...res.data.data];
      this.totalItems = res.data.total;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error loading callers:', err);
      this.isLoading = false;
    }
  });
}


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadCallers(this.currentPage, this.pageSize);
  }

}
