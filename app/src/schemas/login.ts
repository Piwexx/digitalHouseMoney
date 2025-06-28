import * as yup from "yup";

export const schemaLogin = yup
	.object({
		email: yup
			.string()
			.required("El campo es requerido")
			.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo inválido"),
		password: yup
			.string()
			.required("El campo es requerido")
			/*.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/,
				"Contraseña inválida"
			),*/
	}).required()
