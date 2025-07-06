// Base URL for external API calls (e.g., Strapi or other backend services)
// Falls back to empty string; resolveBase will throw an error if this is empty and no other base is provided.
// Expected to be set in .env (e.g., https://api.yourbackend.com)
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Default headers for JSON requests.
// Authorization headers should be added per-request in options if needed.
const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  
};

const resolveBase = (base?: string) => {
  const url = base ?? API_URL;
  if (!url) throw new Error("No se definió la URL base para la solicitud HTTP");
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

export class HttpError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`HTTP error! Status: ${response.status}`);
    this.response = response;
  }
}

const handleResponse = async (response: Response): Promise<unknown> => {
  if (!response.ok) {
    // Attempt to parse error response body for more context, if available
    let errorData;
    try {
      errorData = await response.clone().json(); // Clone to be able to read body multiple times if needed
    } catch (e) {
      // Ignore if error response is not JSON or empty
    }
    // Include errorData in HttpError if available
    throw new HttpError(response);
  }

  // Handle cases like 204 No Content, which have no body
  if (response.status === 204 || response.headers.get("Content-Length") === "0") {
    return null; // Or undefined, or even response itself if preferred
  }

  // Check content type before parsing, if necessary, though often response.json() handles it
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  // Fallback for non-JSON responses or if content-type is missing/different but body is expected
  // This part depends on API contract. For now, assume JSON or text might be possible.
  // If strict JSON is always expected from successful non-204/empty responses,
  // one might throw an error here if not application/json.
  // However, response.json() itself will throw if content is not valid JSON.
  return response.json(); // Let it attempt to parse, will fail for non-JSON.
};

/**
 * Realiza una solicitud HTTP GET.
 * @param {string} endpoint - El endpoint de la solicitud.
 * @param {RequestInit} [options={}] - Opciones adicionales para la solicitud.
 * @returns {Promise<unknown>} - Una promesa que se resuelve con los datos de la respuesta.
 * @throws {HttpError} - Error si la solicitud falla.
 */
interface HttpGetOptions extends RequestInit {
  headers?: HeadersInit;
}

export const httpGet = async (base:string | undefined,endpoint: string , options: HttpGetOptions = {}): Promise<unknown> => {
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'GET',
    headers
  });
  return handleResponse(response);
};

// Made revalidateTag a parameter instead of hardcoding "user-info"
export const httpGetRevalidate = async (base: string | undefined, endpoint: string, token: string, revalidateTag: string, options: HttpGetOptions = {}): Promise<unknown> => {
  const headers = {
    Authorization: token, // Assuming token is always needed for revalidated gets
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'GET',
    headers,
    next: {
      tags: [revalidateTag], // Use the parameter here
    }
  });
  return handleResponse(response);
};


export const httpPost = async (base: string | undefined, endpoint: string, body: object, options: HttpGetOptions = {}): Promise<unknown> => {
  const headers: HeadersInit = {
    ...defaultHeaders,
    ...options.headers,
  } as { [key: string]: string };

  let processedBody;
  if (body instanceof FormData) {
    delete headers['Content-Type'];
    processedBody = body;
  } else {
    processedBody = JSON.stringify(body);
  }

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'POST',
    headers,
    body: processedBody,
  });
  return handleResponse(response);
};

export const httpPut = async (base:string | undefined,endpoint: string, body: object, options: HttpGetOptions = {}): Promise<unknown> => {
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};


export const httpDelete = async (base:string | undefined,endpoint: string, options: HttpGetOptions = {}): Promise<unknown> => {
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'DELETE',
    headers,
  });
  return handleResponse(response);
};



export const httpPatch = async (base:string | undefined,endpoint: string, body: object, options: HttpGetOptions = {}): Promise<unknown> => {
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}
