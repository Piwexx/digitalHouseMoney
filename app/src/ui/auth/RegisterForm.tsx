'use client';
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup for InferType
import { PostRegisterBody } from "@/types/register"; // Assuming this type is mainly for the API body
import { postRegister } from "@/services/auth";
import { useRouter } from "next/navigation";
import { schemaRegister } from "@/schemas/register";
import clsx from "clsx"; // May still be needed for button, or can be removed if button takes over all styling
import Input from "../common/Input"; // Import Input component
import Button from "../common/Button"; // Import Button component

// Type for form data, inferred from the schema
type RegisterFormInputs = yup.InferType<typeof schemaRegister>;

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schemaRegister),
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    setServerError(null);

    // Prepare the body for the API, ensuring dni is a number and confirmPassword is not sent
    const { confirmPassword, ...restData } = data; // Exclude confirmPassword
    const apiBody: PostRegisterBody = {
      ...restData,
      dni: Number(data.dni),
    };

    try {
      const resp = await postRegister(apiBody);
      if (resp) { // Assuming postRegister returns a truthy value on success
        router.push(`/register/success`);
      } else {
        // Handle cases where API might not throw but indicates failure
        setServerError('Error al registrar. Intenta de nuevo.');
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      // HttpError from http.ts might contain response details
      if (err.response && typeof err.response.json === 'function') {
        try {
          const errorData = await err.response.json();
          setServerError(errorData.message || errorData.error || 'Error al registrar. Intenta de nuevo.');
        } catch (jsonError) {
          setServerError('Error al registrar. Intenta de nuevo.');
        }
      } else {
        setServerError(err.message || 'Error al registrar. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Define common input class for this form, to be passed to the Input component
  const formInputClassName = "p-2 sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]";
  // Container class for each input + error message
  const inputContainerClassName = "mb-0"; // Input component has mb-4 default, override if inputs are closer

  return (
    <>
      <form
        onSubmit={hookFormSubmit(onSubmit)}
        noValidate // Prevent default browser validation
        className="w-full max-w-4xl p-8 rounded-lg"
      >
        <h2 className="w-full max-w-4xl mb-6 text-xl font-semibold text-center">Crear cuenta</h2>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <Input
            type="text"
            placeholder="Nombre*"
            registration={register("firstname")}
            error={errors.firstname}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
          <Input
            type="text"
            placeholder="Apellido*"
            registration={register("lastname")}
            error={errors.lastname}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
          <Input
            type="text" // Keep as text for RHF, schema handles numeric check
            placeholder="DNI*"
            registration={register("dni")}
            error={errors.dni}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
          <Input
            type="email"
            placeholder="Correo electrónico*"
            registration={register("email")}
            error={errors.email}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
        </div>

        <p className="text-sm text-white mt-2 mb-4 text-center">
          Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
        </p>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <Input
            type="password"
            placeholder="Contraseña*"
            registration={register("password")}
            error={errors.password}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
          <Input
            type="password"
            placeholder="Confirmar contraseña*"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
          <Input
            type="tel"
            placeholder="Teléfono*"
            registration={register("phone")}
            error={errors.phone}
            inputClassName={formInputClassName}
            containerClassName={inputContainerClassName}
          />
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            className="sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px] mb-4 p-2" // Re-apply specific sizing/margin from original
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </div>
        {serverError && (
          <div className='text-error flex items-center justify-center mt-4 mb-4 gap-2'> {/* Was missing justify-center */}
            <p className='text-sm italic font-normal text-red-500'>{serverError}</p>
          </div>
        )}
      </form>
    </>
  );
}
