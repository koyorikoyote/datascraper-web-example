import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;          // omit or undefined for the current page
}

interface BreadcrumbProps {
  items: Crumb[];       // ordered left to right
  className?: string;   // optional extra classes
}

/**
 * Usage:
 * <Breadcrumb
 *   items={[
 *     { label: t('keyword.title'), to: '/keywords' },
 *     { label: keyword },
 *   ]}
 * />
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <h1 className={`text-2xl font-semibold ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const content = item.to && !isLast ? (
          <Link to={item.to} className="text-blue-600 hover:underline">
            {item.label}
          </Link>
        ) : (
          <span>{item.label}</span>
        );
        return (
          <span key={idx}>
            {idx > 0 && <span>{' > '}</span>}
            {content}
          </span>
        );
      })}
    </h1>
  );
}
