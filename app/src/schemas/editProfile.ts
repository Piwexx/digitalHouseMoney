import * as yup from "yup";

export const schemaEditProfile = yup
  .object({
    firstname: yup
      .string()
      .required("El campo es requerido")
      .min(3, "El campo debe tener al menos 3 caracteres")
      .matches(/^(?! )[A-Za-z\s]+$/, "El campo solo puede contener letras"),
    lastname: yup
      .string()
      .required("El campo es requerido")
      .min(3, "El campo debe tener al menos 3 caracteres")
      .matches(/^(?! )[A-Za-z\s]+$/, "El campo solo puede contener letras"),
    phone: yup.string().required("El campo es requerido"),
  })
  .required();