import { Card } from "./card";

export interface Meta {
    current_rows?: Number;
    total_rows?: Number;
    rows_remaining?: Number;
    total_pages?: Number;
    pages_remaining?: Number;
    next_page?: String;
    next_page_offset?: Number;
}

export interface CardRes {
    data: Array<Card>;
    meta: Meta;
}
