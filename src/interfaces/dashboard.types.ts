export interface WeeklyContactItem {
  date: string;
  inquiries: number;
}

export interface DashboardData {
  keyword_count: number;
  serp_result_count: number;
  batch_history_count: number;
  weekly_contact_sending: WeeklyContactItem[];
}
