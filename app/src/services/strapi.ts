// It's good practice to define shared types in a dedicated /types folder.
// For example, these types could live in 'app/src/types/strapi.ts'
// For now, keeping them here for self-containment of this example.
export interface StrapiDataItem { // Renamed Home to be more generic if this func fetches various types
  id: number;
  // documentId: string; // Example field, adjust to actual Strapi attributes
  attributes: { // Common Strapi structure wraps fields in 'attributes'
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    // Potentially more fields depending on the endpoint
    [key: string]: any; // Allow other attributes
  }
}

export interface GetStrapiDataResult<T> { // Made generic for the data type
  data: T[] | null; // Return null for data on error, or empty array if that's preferred
  error: string | null;
}

// Example of a more type-safe endpoint definition
// export type StrapiEndpoint = "homes" | "pages" | "articles"; // etc.

export const getStrapiData = async <T = StrapiDataItem>(
  endpoint: string, // Consider using StrapiEndpoint if defined
  // params?: Record<string, string> // Optional: for query parameters like populate, filters
): Promise<GetStrapiDataResult<T>> => {
  const API_URL = process.env.STRAPI_URL;
  const TOKEN = process.env.STRAPI_API;

  if (!API_URL || !TOKEN) {
    console.error("Strapi URL or API Token is not configured.");
    return {
      data: null,
      error: "Strapi service is not configured.",
    };
  }

  // TODO: Construct URL with params if provided, e.g., using URLSearchParams

  try {
    const res = await fetch(`${API_URL}/api/${endpoint}`, { // Ensure endpoint doesn't include /api/ if API_URL does
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      // cache: 'no-store', // Or other caching strategy as needed for Strapi data
    });

    if (!res.ok) {
      let errorMsg = `Error ${res.status}: ${res.statusText}`;
      try {
        const errorData = await res.json();
        // Adjust according to Strapi's actual error response structure
        errorMsg = errorData?.error?.message || errorData?.message || errorMsg;
      } catch (e) {
        // Failed to parse error JSON, stick with status text
      }
      return {
        data: null,
        error: errorMsg,
      };
    }

    // Handle cases where response might be OK but no content (e.g. 204)
    // Though for a GET list, this usually means an empty array rather than 204.
    if (res.status === 204) {
        return { data: [], error: null };
    }

    const jsonResponse = await res.json();
    // Strapi typically wraps data in a 'data' field, and actual content in 'attributes'
    // This might need adjustment based on endpoint (single type vs collection type)
    // and populate parameters.
    // Assuming jsonResponse.data is the array of items for collection types.
    return {
      data: (jsonResponse.data as T[]), // Adjust if Strapi's response structure for collections is different
      error: null,
    };
  } catch (err) {
    console.error(`Strapi fetch error for endpoint ${endpoint}:`, err);
    return {
      data: null,
      error: (err instanceof Error ? err.message : String(err)) || 'Error desconocido conectando con Strapi',
    };
  }
};