'use client';
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup for InferType
import { PostRegisterBody } from "@/types/register"; // Assuming this type is mainly for the API body
import { postRegister } from "@/services/auth";
import { useRouter } from "next/navigation";
import { schemaRegister } from "@/schemas/register";
import clsx from "clsx";

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

    // Prepare the body for the API, ensuring dni is a number
    const apiBody: PostRegisterBody = {
      ...data,
      dni: Number(data.dni), // DNI is string in form, number in API type
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

  const inputBaseClass = 'w-full p-2 rounded-xl text-black mb-1 bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px]';
  const errorClass = 'border-2 border-red-500';
  const errorTextClass = 'text-red-500 text-sm mb-2';

  return (
    <>
      <form
        onSubmit={hookFormSubmit(onSubmit)}
        noValidate // Prevent default browser validation
        className="w-full max-w-4xl p-8 rounded-lg"
      >
        <h2 className="w-full max-w-4xl mb-6 text-xl font-semibold text-center">Crear cuenta</h2>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div>
            <input
              {...register("firstname")}
              type="text"
              placeholder="Nombre*"
              className={clsx(inputBaseClass, { [errorClass]: errors.firstname })}
              aria-invalid={errors.firstname ? "true" : "false"}
            />
            {errors.firstname && <p className={errorTextClass}>{errors.firstname.message}</p>}
          </div>
          <div>
            <input
              {...register("lastname")}
              type="text"
              placeholder="Apellido*"
              className={clsx(inputBaseClass, { [errorClass]: errors.lastname })}
              aria-invalid={errors.lastname ? "true" : "false"}
            />
            {errors.lastname && <p className={errorTextClass}>{errors.lastname.message}</p>}
          </div>
          <div>
            <input
              {...register("dni")}
              type="text" // Keep as text for RHF, schema handles numeric check
              placeholder="DNI*"
              className={clsx(inputBaseClass, { [errorClass]: errors.dni })}
              aria-invalid={errors.dni ? "true" : "false"}
            />
            {errors.dni && <p className={errorTextClass}>{errors.dni.message}</p>}
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Correo electrónico*"
              className={clsx(inputBaseClass, { [errorClass]: errors.email })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
          </div>
        </div>

        <p className="text-sm text-white mt-2 mb-4 text-center">
          Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
        </p>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Contraseña*"
              className={clsx(inputBaseClass, { [errorClass]: errors.password })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className={errorTextClass}>{errors.password.message}</p>}
          </div>
          <div>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirmar contraseña*"
              className={clsx(inputBaseClass, { [errorClass]: errors.confirmPassword })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && <p className={errorTextClass}>{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Teléfono*"
              className={clsx(inputBaseClass, { [errorClass]: errors.phone })}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && <p className={errorTextClass}>{errors.phone.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-base sm:text-lg mb-4 rounded-lg w-full btn-primary p-2 font-bold text-black sm:min-h-[64px] sm:min-w-[360px] min-w-[300px] min-h-[50px] disabled:opacity-50"
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </div>
        {serverError && (
          <div className='text-error flex items-center justify-center mt-4 mb-4 gap-2'>
            <p className='text-sm italic font-normal text-red-500'>{serverError}</p>
          </div>
        )}
      </form>
    </>
  );
}
