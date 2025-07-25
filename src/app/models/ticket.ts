

export interface Ticket {
  id: number;
  caller_id: number;
  agent_id?: number;
  status: string;
  subject: string;
  description?: string;
  priority: string;
  completed_at: any;
  forwarded_to: any;
  escalated_to: any;
  created_at: string;
  updated_at: string;
  caller: caller;
  agent?: Agent;
    notes?: Note[]; 

}

export interface caller {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  remember_token?: string;
}
export interface Note {
  id: number;
  ticket_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

