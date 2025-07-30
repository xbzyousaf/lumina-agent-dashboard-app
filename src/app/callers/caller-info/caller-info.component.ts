import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'app/services/api.service';
import { Caller } from 'app/models/caller';
import { CallHistoryItem } from 'app/models/call-history';
import { Base } from 'app/models/base';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
@Component({
  selector: 'app-caller-info',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './caller-info.component.html',
  styleUrls: ['./caller-info.component.scss']
})
export class CallerInfoComponent implements OnInit {
  caller: Caller | null = null;
  callHistory: CallHistoryItem[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
      private route: ActivatedRoute,
) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.fetchCallerWithHistory(id);
      }
    });
  }

 fetchCallerWithHistory(id: number): void {
  this.isLoading = true;
  this.apiService.get<Base<{ caller: Caller; call_history: CallHistoryItem[]}>>(`caller/${id}/callhistory`)
    .subscribe({
      next: (res) => {
        console.log("res::", res.data.call_history);
        this.caller = res.data.caller;
        this.callHistory = res.data.call_history;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching caller info:', err);
          this.isLoading = false;
      }
    });
   }
}
