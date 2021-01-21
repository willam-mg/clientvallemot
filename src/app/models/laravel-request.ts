export class LaravelRequest {
    current_page: number;
    data: Array<any>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    constructor() {
        this.current_page = 0;
        this.data = Array<any>();
        this.first_page_url = '';
        this.from = 0;
        this.last_page = 0;
        this.last_page_url = '';
        this.next_page_url = '';
        this.path = '';
        this.per_page = 0;
        this.prev_page_url = '';
        this.to = 0;
        this.total = 0;
    }
}
