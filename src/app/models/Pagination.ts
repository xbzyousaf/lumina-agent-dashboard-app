// models/paginated-response.model.ts

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export class PaginatedResponse<T> {
  current_page: number = 1;
  data: T[] = [];
  first_page_url: string = '';
  from: number = 0;
  last_page: number = 1;
  last_page_url: string = '';
  links: Link[] = [];
  next_page_url: string | null = null;
  path: string = '';
  per_page: number = 10;
  prev_page_url: string | null = null;
  to: number = 0;
  total: number = 0;

  constructor(init?: Partial<PaginatedResponse<T>>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

