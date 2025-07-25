import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'app/services/api.service';
import { Caller } from 'app/models/caller';
import { CallHistoryItem } from 'app/models/call-history';
import { Base } from 'app/models/base';

@Component({
  selector: 'app-caller-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caller-info.component.html',
  styleUrls: ['./caller-info.component.scss']
})
export class CallerInfoComponent implements OnInit {
  caller: Caller | null = null;
  callHistory: CallHistoryItem[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const callerId = 1; 
    this.fetchCallerWithHistory(callerId);
  }

 fetchCallerWithHistory(id: number): void {
  this.apiService
    .get<Base<{ caller: Caller; call_history: CallHistoryItem[]}>>(`caller/${id}/callhistory`)
    .subscribe({
      next: (res) => {
        console.log("res::", res);
        this.caller = res.data.caller;
        this.callHistory = res.data.call_history;
      },
      error: (err) => {
        console.error('Error fetching caller info:', err);
      }
    });
}


}
