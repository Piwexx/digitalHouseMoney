export interface Service {
  id: number;
  name: string;
  date: string; // Date string, format depends on API (e.g., ISO 8601)
  invoice_value: string; // Monetary value, API provides as string (e.g., "123.45"). Parse to number for calculations.
}