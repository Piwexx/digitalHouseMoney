const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

//Si necesito auth, envio en options Authorization: token,
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
    throw new HttpError(response);
  }
  return response.json();
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

export const httpGetRevalidate = async (base:string | undefined,endpoint: string, token: string, revalidateTag: string, options: HttpGetOptions = {}): Promise<unknown> => {
  const headers = {
    Authorization: token,
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(`${resolveBase(base)}${endpoint}`, {
    ...options,
    method: 'GET',
    headers,
    next: {
      tags: ["user-info"],
    }
  });
  return handleResponse(response);
};


export const httpPost = async (base:string | undefined,endpoint: string, body: object, options: HttpGetOptions = {}): Promise<unknown> => {
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
