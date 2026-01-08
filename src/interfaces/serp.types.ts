export interface SerpBase {
  keyword_id: number;
  title: string;
  link: string;
  snippet?: string | null;
  position: number;
  rank?: string | null;
  status: string;
  total_weight?: number | null;
  service_price?: number | null;
  service_volume?: number | null;
  site_size?: number | null;
  metric_price?: number | null;
  metric_volume?: number | null;
  metric_site_size?: number | null;

  candidate_keyword?:
    | {
        keyword: string;
        volume: number;
      }[]
    | null;

  company_name?: string | null;
  domain_name?: string | null;
  contact_person?: string | null;
  phone_number?: string | null;
  url_corporate_site?: string | null;
  url_service_site?: string | null;
  email_address?: string | null;
  has_column_section?: boolean | null;
  column_determination_reason?: string | null;
  industry?: string | null;
  has_own_product_service_offer?: boolean | null;
  notes?: string | null;
  activity_date?: string | null;
  created_at: string;
  is_hubspot_duplicate?: boolean | null;
}

export interface Serp extends SerpBase {
  id: number;
}
