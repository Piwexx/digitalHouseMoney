export interface Card {
  id: number;
  account_id: number;
  number_id: number;        // Card number, stored as number (API might expect this)
  first_last_name: string;
  cod: number;              // CVC/CVV, stored as number (API might expect this)
  expiration_date: string;  // Expected format by API, e.g., "YYYY-MM-DD" or "MM/YY"
                           // The schemaCard expects "MM/YY", convertDateFormat changes it.
}

// Payload for creating a new card
export interface CardPostPayload {
  number_id: number;        // Card number as a number
  first_last_name: string;
  cod: number;              // CVC/CVV as a number
  expiration_date: string;  // Formatted date string, e.g., "YYYY-MM-DD" expected by API
}

// Response after creating a card
// Assuming the API returns the full card object upon successful creation
export type CardPostResponse = Card;