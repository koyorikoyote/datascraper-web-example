export interface WeightedMetricBase {
    label: string;
    value: number;
}
  
export interface WeightedMetricInDBBase extends WeightedMetricBase {
    id: number;
}
  
export interface ScoreThresholdBase {
    label: string;
    value: number;
}
  
export interface ScoreThresholdInDB extends ScoreThresholdBase {
    id: number;
}   
  
export interface ScoreSetting {
    weighted_metrics: WeightedMetricInDBBase[];
    score_thresholds: ScoreThresholdInDB[];
}