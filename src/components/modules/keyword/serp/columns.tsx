import type { ColumnDef } from '@tanstack/react-table'
import TableCellViewer from '@/components/global/TableCellViewer'
import { DateCell } from '@/components/global/DateCell'
import StatusBadge from '@/components/global/StatusBadge'
import type { Serp } from '@/interfaces'
import type { StatusConst } from '@/constants/status'
import { Badge } from '@/components/ui/badge'

export function getColumns(t: (key: string) => string): ColumnDef<Serp>[] {
  return [
    {
      accessorKey: 'position',
      header: t('serp.position'),
      cell: ({ row, table }) => {
        return table.getSortedRowModel().rows.findIndex((r) => r.id === row.id) + 1
      },
      size: 40
    },
    {
      accessorKey: 'rank',
      header: t('serp.rank'),
      cell: ({ row }) => {
        return row.original.rank ? row.original.rank : '-';
      },
      size: 80
    },
    {
      accessorKey: 'status',
      header: t('serp.status'),
      cell: ({ row }) => <StatusBadge status={row.original.status as StatusConst} />,
      size: 100
    },
    {
      accessorKey: 'is_hubspot_duplicate',
      header: t('serp.isHubspotDuplicate'),
      cell: ({ row }) => (
        row.original.is_hubspot_duplicate ?
          <Badge variant="destructive"> {t('common.duplicate')} </Badge> :
          <Badge variant="secondary"> {t('common.unique')} </Badge>
      ),
      size: 100
    },
    {
      accessorKey: 'title',
      header: t('serp.titleColumn'),
      cell: ({ row }) => <TableCellViewer {...row.original} />,
      size: 300
    },
    {
      accessorKey: 'company_name',
      header: t('serp.companyName'),
      cell: ({ row }) => {
        return row.original.company_name ? row.original.company_name : '-';
      },
      size: 200
    },
    {
      accessorKey: 'domain_name',
      header: t('serp.domainName'),
      cell: ({ row }) => {
        const domain = row.original.domain_name;
        if (!domain) return '-';

        // Create a proper URL (add https:// if not present)
        const url = domain.startsWith('http') ? domain : `https://${domain}`;

        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {domain}
          </a>
        );
      },
      size: 180
    },
    {
      accessorKey: 'has_column_section',
      header: t('serp.hasColumn'),
      cell: ({ row }) => {
        const val = row.original.has_column_section;
        return val === true ? t('common.have') : val === false ? t('common.notHave') : '-';
      },
      size: 110
    },
    {
      accessorKey: 'has_own_product_service_offer',
      header: t('serp.hasOwnOffer'),
      cell: ({ row }) => {
        const val = row.original.has_own_product_service_offer;
        return val === true ? t('common.have') : val === false ? t('common.notHave') : '-';
      },
      size: 160
    },
    {
      accessorKey: 'industry',
      header: t('serp.industry'),
      cell: ({ row }) => {
        return row.original.industry ? row.original.industry : '-';
      },
      size: 140
    },
    {
      accessorKey: 'contact_person',
      header: t('serp.contactPerson'),
      cell: ({ row }) => {
        return row.original.contact_person ? row.original.contact_person : '-';
      },
      size: 150
    },
    {
      accessorKey: 'phone_number',
      header: t('serp.phoneNumber'),
      cell: ({ row }) => {
        return row.original.phone_number ? row.original.phone_number : '-';
      },
      size: 130
    },
    {
      accessorKey: 'email_address',
      header: t('serp.emailAddress'),
      cell: ({ row }) => {
        const email = row.original.email_address;
        return email ? (
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        ) : '-';
      },
      size: 200
    },
    {
      accessorKey: 'service_price',
      header: t('serp.servicePrice'),
      cell: ({ row }) => {
        const price = row.original.service_price;
        return price !== null && price !== undefined
          ? `¥${price.toLocaleString()}`
          : '-';
      },
      size: 120
    },
    {
      accessorKey: 'service_volume',
      header: t('serp.serviceVolume'),
      cell: ({ row }) => {
        const service_volume = row.original.service_volume;
        return service_volume !== null && service_volume !== undefined
          ? service_volume.toLocaleString()
          : '-';
      },
      size: 120
    },
    {
      accessorKey: 'site_size',
      header: t('serp.siteSize'),
      cell: ({ row }) => {
        const site_size = row.original.site_size;
        return site_size !== null && site_size !== undefined
          ? site_size.toLocaleString()
          : '-';
      },
      size: 100
    },
    {
      accessorKey: 'activity_date',
      header: t('serp.activityDate'),
      cell: ({ row }) => {
        const date = row.original.activity_date;
        return date ? <DateCell date={date} /> : '-';
      },
      size: 120
    },
    {
      accessorKey: 'created_at',
      header: t('serp.createdAt'),
      cell: ({ row }) => <DateCell date={row.original.created_at} />,
      size: 120
    },
  ]
}
