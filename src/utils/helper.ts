import type { FormValue } from "@/interfaces";
import type { RowSelectionState } from '@tanstack/react-table';

/**
 * Translate a plain object to FormData.
 */
export function toFormData<
  T extends Record<string, FormValue | null | undefined>
>(data: T): FormData {
  const formData = new FormData();

  (Object.entries(data) as Array<[keyof T, T[keyof T]]>).forEach(
    ([key, value]) => {
      if (value === null || value === undefined) return;

      if (typeof value === "number" || typeof value === "boolean") {
        formData.append(String(key), value.toString());
      } else {
        formData.append(String(key), value as string | Blob);
      }
    }
  );

  return formData;
}

/**
 * Capitalizes first letter, then replaces "_" with " ".
 */
export function formatLabel(input: string): string {
  return input
    .replace(/_/g, ' ')                    // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

export function formatLocaleLabel(
  id_key: number | string,
  locale: string,
  translate: (key: string) => string = (k) => k
): string {
  const id = String(id_key).trim()
  const key = `${locale}.${id}`
  const translated = translate(key)

  // Many i18n libs return the key if no match; detect that and fall back.
  return translated === key ? id : translated
}

/**
 * Return the array of selected row IDs.
 *
 * @param rowSelection - TanStack rowSelection state
 * @param rows         - Your table rows (must have `.id`)
 * @param explicitId   - Optional single ID to override the selection
 */
export function getSelectedIds<T extends { id: number }>(
  rowSelection: RowSelectionState,
  rows: T[],
  explicitId: number | null,
): number[] {
  if (explicitId != null) return [explicitId];     // handles 0 correctly

  // Check if keys are likely indices (numeric strings 0, 1, 2) or IDs (could be anything)
  return Object.keys(rowSelection)
    .map(idx => rows[Number(idx)]?.id)
    .filter((id): id is number => typeof id === 'number');
}

// For use when rowSelection keys are already the IDs (when getRowId is used)
export function getIdsFromSelection(
  rowSelection: RowSelectionState,
  explicitId: number | null
): number[] {
  if (explicitId != null) return [explicitId];
  return Object.keys(rowSelection).map(Number).filter(id => !isNaN(id));
}

export function displayValueOrDash<T>(value: T | null | undefined, fallback: string = '-'): string {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return String(value);
}
