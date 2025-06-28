type Home = {
  id: number,
  documentId: string,
  title: string,
  description: string,
  createdAt?: string,
  updatedAt?: string,
  publishedAt?: string
};

type GetHomeResult = {
  data: Home[] | [];
  error: string | null;
};


export const getStaticData = async (endpoint:string):Promise<GetHomeResult> => {
  const API_URL = process.env.STRAPI_URL;
  const TOKEN = process.env.STRAPI_API;

  try {
    const res = await fetch(`${API_URL}/api/${endpoint}`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });


   if (!res.ok) {
      const errorData = await res.json();
      return {
        data: [],
        error: errorData?.error?.message || res.statusText,
      };
    }

    const json = await res.json();
    return {
      data: json.data,
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      error: (err as Error).message || 'Error desconocido',
    };
  }
};