export interface CallHistoryItem {
    
  id: number;
  call_start_time: string;
  call_end_time: string;
  notes: string;
  outcome: string;
  agent: {
    id: number;
    name: string;
  };
  ticket: {
    id: number;
    subject: string;
    priority: string;
  };
}
