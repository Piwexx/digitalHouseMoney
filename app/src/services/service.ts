import { Service } from '@/types/service';

// Custom error class for this specific service, if needed, or use a generic one.
class DigitalHouseServiceError extends Error {
  response?: Response;
  constructor(message: string, response?: Response) {
    super(message);
    this.name = 'DigitalHouseServiceError';
    this.response = response;
  }
}

const DIGITAL_HOUSE_API_URL = 'https://digitalmoney.digitalhouse.com/service';

export async function getService(): Promise<Service[]> {
  try {
    const response = await fetch(DIGITAL_HOUSE_API_URL);
    if (!response.ok) {
      // Attempt to get more details from error response if possible
      let errorDetails = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetails = errorData.message || errorData.error || errorDetails;
      } catch (e) { /* Ignore if error response is not JSON */ }
      throw new DigitalHouseServiceError(errorDetails, response);
    }
    // Handle 204 No Content or empty responses if applicable for this API
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
      return []; // Or handle as appropriate, e.g. throw error if content expected
    }
    return response.json() as Promise<Service[]>;
  } catch (error) {
    // Catch network errors or errors from the !response.ok block
    console.error("Error fetching services:", error);
    // Re-throw or handle as per application's error strategy
    // If error is already a DigitalHouseServiceError, just rethrow it
    if (error instanceof DigitalHouseServiceError) throw error;
    throw new DigitalHouseServiceError((error as Error).message || 'Failed to fetch services');
  }
}

export async function getServiceById(id: number): Promise<Service> {
  try {
    const response = await fetch(`${DIGITAL_HOUSE_API_URL}/${id}`);
    if (!response.ok) {
      let errorDetails = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetails = errorData.message || errorData.error || errorDetails;
      } catch (e) { /* Ignore if error response is not JSON */ }
      throw new DigitalHouseServiceError(errorDetails, response);
    }
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
      // This case might mean "not found" or an empty valid response.
      // Throwing an error here as a single service is expected.
      throw new DigitalHouseServiceError(`Service with ID ${id} not found or empty response.`, response);
    }
    return response.json() as Promise<Service>;
  } catch (error) {
    console.error(`Error fetching service by ID ${id}:`, error);
    if (error instanceof DigitalHouseServiceError) throw error;
    throw new DigitalHouseServiceError((error as Error).message || `Failed to fetch service with ID ${id}`);
  }
}