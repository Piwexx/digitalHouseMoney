export interface RegisterData {
	dni: string,
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  confirmPassword: string,
  phone: string,
}

export interface PostRegisterBody {
	dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  // confirmPassword should not be sent to the backend
  phone: string;
}

export interface PostRegisterResponse {
	account_id: number;
	email: string;
	user_id: number;
}