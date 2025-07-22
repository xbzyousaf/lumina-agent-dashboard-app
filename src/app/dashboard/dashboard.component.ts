import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tickets: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getActiveTickets();
  }

  getActiveTickets() {
    this.http.get<any[]>('https://your-api.com/api/active-tickets')
      .subscribe(data => {
        this.tickets = data;
      }, error => {
        console.error('Failed to fetch tickets:', error);
      });
  }

}
