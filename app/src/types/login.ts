export interface UserData {
  email: string;
  password: string;
}

export interface PostLoginBody {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  token: string;
  error?: string;
}

export interface GetTokenResponse {
  token: string;
  error?: string;
}