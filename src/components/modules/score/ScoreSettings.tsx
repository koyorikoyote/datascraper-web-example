import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import type { ScoreSetting, ScoreThresholdInDB, WeightedMetricInDBBase } from "@/interfaces";
import { useScoreSettings } from './useScoreSettings'

const toOneDecimal = (n: number): number => Math.round(n * 10) / 10
const MAX_TOTAL = 1.0

export default function ScoreSettings() {
  const { t, onSaveScoreSetting, scoreSettings, setScoreSettings } = useScoreSettings()

  const handleThresholdChange = (threshold: ScoreThresholdInDB, value: string) => {
    setScoreSettings(prev => {
      const score_thresholds = (prev?.score_thresholds ?? []).map(th => {
        if (th.id === threshold.id) {
          const num = toOneDecimal(parseFloat(value))
          return !Number.isNaN(num) ? { ...th, value: num } : th
        }
        return th
      })
  
      return {
        ...prev,
        score_thresholds,
      } as ScoreSetting
    })
  }

  const handleWeightMetricChange = (metric: WeightedMetricInDBBase, value: number) => {
    setScoreSettings(prev => {
      
      const currentTotal = (prev?.weighted_metrics ?? []).reduce(
        (sum, m) => sum + m.value,
        0
      )

      const weighted_metrics = (prev?.weighted_metrics ?? []).map(m => {
        if (m.id === metric.id) {
          const num = toOneDecimal(value)
          if (Number.isNaN(num)) return m
      
          const delta = num - m.value
          const newTotal = currentTotal + delta
      
          if (newTotal <= MAX_TOTAL) {
            return { ...m, value: num }
          }

          return m
        }
      
        return m
      })
      
      return {
        ...prev,
        weighted_metrics,
      } as ScoreSetting
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t('score.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle>{t('score.thresholds')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(scoreSettings?.score_thresholds)?.map(threshold => (
              <div key={threshold.id} className="flex items-center justify-between">
                <label className="text-sm font-medium">{threshold.label} ≥</label>
                <input
                  type="number"
                  step="0.1"
                  max = "10"
                  min = "0"
                  className="w-24 text-right border rounded px-2 py-1"
                  value={threshold.value.toFixed(1)}
                  onChange={e => handleThresholdChange(threshold, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('score.weights')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {scoreSettings?.weighted_metrics.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{t(`score.${metric.label}`)}</span>
                  <span>{metric.value.toFixed(1)}</span>
                </div>
                <Slider
                  value={[metric.value]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={val =>
                    handleWeightMetricChange(metric, val[0])
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 text-right gap-2">
        <Button onClick={e => onSaveScoreSetting(e)}>{t('score.save')}</Button>
      </div>
    </div>
  )
}
