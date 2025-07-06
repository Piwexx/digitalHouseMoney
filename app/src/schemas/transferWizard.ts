import * as yup from "yup";

export const transferWizardSchema = yup.object({
  selectedCardId: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value)) // Ensure NaN input becomes undefined for 'required'
    .required("Debes seleccionar una tarjeta."),
  amount: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value)) // Ensure NaN input becomes undefined
    .required("El monto es requerido.")
    .min(1, "El monto debe ser mayor a $0.") // Assuming minimum amount is 1
    .typeError("Por favor, ingresa un monto válido."), // For non-numeric input
}).required();

export type TransferWizardFormInputs = yup.InferType<typeof transferWizardSchema>;
