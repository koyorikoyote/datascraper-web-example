import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Serp } from '@/interfaces'
import { useTranslation } from '@/context/i18n/useTranslation';
import { useFormatDate } from '@/hooks/useFormatDate';

export default function TableCellViewer(data: Serp) {
  const { t } = useTranslation();
  const format = useFormatDate()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-blue-600 hover:underline">
          {data.title}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-4 w-[600px]">
        <SheetHeader>
          <SheetTitle className="pr-6 text-center">{data.title}</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="p-4 space-y-4 text-sm overflow-y-auto">
          {/* Basic SERP Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{t('serp.basicInfo')}</h3>
            <p>
              <strong>{t('serp.position')}:</strong> {data.position}
            </p>
            {data.rank && (
              <p>
                <strong>{t('serp.rank')}:</strong> {data.rank}
              </p>
            )}
            <p>
              <strong>{t('serp.link')}:</strong>{' '}
              <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {data.link}
              </a>
            </p>
            {data.snippet && (
              <p>
                <strong>{t('serp.snippet')}:</strong> {data.snippet}
              </p>
            )}
          </div>

          {/* Company Information */}
          {(data.company_name || data.domain_name || data.url_corporate_site || data.url_service_site) && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{t('serp.companyInfo')}</h3>
                {data.company_name && (
                  <p>
                    <strong>{t('serp.companyName')}:</strong> {data.company_name}
                  </p>
                )}
                {data.domain_name && (
                  <p>
                    <strong>{t('serp.domainName')}:</strong> {data.domain_name}
                  </p>
                )}
                {data.url_corporate_site && (
                  <p>
                    <strong>{t('serp.corporateSite')}:</strong>{' '}
                    <a href={data.url_corporate_site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {data.url_corporate_site}
                    </a>
                  </p>
                )}
                {data.url_service_site && (
                  <p>
                    <strong>{t('serp.serviceSite')}:</strong>{' '}
                    <a href={data.url_service_site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {data.url_service_site}
                    </a>
                  </p>
                )}
              </div>
            </>
          )}

          {/* Contact Information */}
          {(data.contact_person || data.phone_number || data.email_address) && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{t('serp.contactInfo')}</h3>
                {data.contact_person && (
                  <p>
                    <strong>{t('serp.contactPerson')}:</strong> {data.contact_person}
                  </p>
                )}
                {data.phone_number && (
                  <p>
                    <strong>{t('serp.phoneNumber')}:</strong> {data.phone_number}
                  </p>
                )}
                {data.email_address && (
                  <p>
                    <strong>{t('serp.emailAddress')}:</strong>{' '}
                    <a href={`mailto:${data.email_address}`} className="text-blue-600 hover:underline">
                      {data.email_address}
                    </a>
                  </p>
                )}
              </div>
            </>
          )}

          {/* Service Metrics */}
          {(data.service_price !== null || data.service_volume !== null || data.site_size !== null || 
            data.total_weight !== null || data.metric_price !== null || data.metric_volume !== null || 
            data.metric_site_size !== null || (data.candidate_keyword && data.candidate_keyword.length > 0)) && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{t('serp.serviceMetrics')}</h3>
                {data.total_weight !== null && (
                  <p>
                    <strong>{t('serp.totalWeight') || 'Total Weight'}:</strong> {data.total_weight?.toLocaleString() ?? 0}
                  </p>
                )}
                <p>
                  <strong>{t('serp.servicePrice')}:</strong> ¥{data.service_price?.toLocaleString() ?? 0}
                </p>
                {data.metric_price !== null && (
                  <p>
                    <strong>{t('serp.metricPrice') || 'Metric Price'}:</strong> {data.metric_price?.toLocaleString() ?? 0}
                  </p>
                )}
                <p>
                  <strong>{t('serp.serviceVolume')}:</strong> {data.service_volume?.toLocaleString() ?? 0}
                </p>
                {data.metric_volume !== null && (
                  <p>
                    <strong>{t('serp.metricVolume') || 'Metric Volume'}:</strong> {data.metric_volume?.toLocaleString() ?? 0}
                  </p>
                )}
                <p>
                  <strong>{t('serp.siteSize')}:</strong> {data.site_size?.toLocaleString() ?? 0}
                </p>
                {data.metric_site_size !== null && (
                  <p>
                    <strong>{t('serp.metricSiteSize') || 'Metric Site Size'}:</strong> {data.metric_site_size?.toLocaleString() ?? 0}
                  </p>
                )}
                {data.candidate_keyword && data.candidate_keyword.length > 0 && (
                  <div>
                    <strong>{t('serp.candidateKeywords') || 'Candidate Keywords'}:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {data.candidate_keyword.map((item, index) => (
                        <li key={index}>
                          {item.keyword} ({t('serp.volume') || 'Volume'}: {item.volume})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Notes and Dates */}
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{t('serp.additionalInfo')}</h3>
            {data.notes && (
              <p>
                <strong>{t('serp.notes')}:</strong> {data.notes}
              </p>
            )}
            {data.activity_date && (
              <p>
                <strong>{t('serp.activityDate')}:</strong> {format(data.activity_date)}
              </p>
            )}
            <p>
              <strong>{t('serp.createdAt')}:</strong> {format(data.created_at)}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
