export function deepMatch(haystack: unknown, needle: string): boolean {
    const q = needle.trim().toLowerCase();
  
    const scan = (v: unknown): boolean => {
      if (v == null) return false;
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
        return String(v).toLowerCase().includes(q);
      if (Array.isArray(v)) return v.some(scan);
      if (typeof v === 'object') return Object.values(v).some(scan);
      return false;
    };
  
    return scan(haystack);
  }

export function filterRows<T>(rows: T[], needle: string): T[] {
    const q = needle.trim().toLowerCase();
    return rows.filter((row) => deepMatch(row, q));
}