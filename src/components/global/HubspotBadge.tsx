import { BluetoothConnected } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HubspotBadgeProps {
  currentHubDomain?: string | null;
  onConnect: () => void;
  label: string;
}

/** Shows a green badge when HubSpot is connected, otherwise a “Connect” button */
export function HubspotBadge({
  currentHubDomain,
  onConnect,
  label,
}: HubspotBadgeProps) {
  return currentHubDomain ? (
    <span className="inline-flex items-center gap-1 sm:gap-2 text-green-600">
      <BluetoothConnected className="h-4 w-4" />
      <span className="hidden sm:inline">{currentHubDomain}</span>
    </span>
  ) : (
    <Button
      variant="default"
      size="sm"
      className="flex items-center gap-1 sm:gap-2"
      onClick={onConnect}
    >
      <BluetoothConnected className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
