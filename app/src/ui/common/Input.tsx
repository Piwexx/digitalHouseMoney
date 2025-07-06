import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text to display above the input. */
  label?: string;
  /** Object returned from `react-hook-form`'s `register` function. */
  registration?: Partial<UseFormRegisterReturn>;
  /** Error object from `react-hook-form`'s `formState.errors` for this field. */
  error?: FieldError | undefined;
  /** Optional CSS class name for the div wrapping the label, input, and error message. */
  containerClassName?: string;
  /** Optional CSS class name for the label. */
  labelClassName?: string;
  /** Optional CSS class name for the input element itself, allowing style overrides. */
  inputClassName?: string;
  /** Optional CSS class name for the error message paragraph. */
  errorClassName?: string;
}

/**
 * A reusable Input component designed for use with React Hook Form.
 * It includes an optional label, error message display, and ARIA attributes for accessibility.
 */
const Input: React.FC<InputProps> = ({
  label,
  registration,
  error,
  type = 'text',
  containerClassName,
  labelClassName,
  inputClassName, // User-provided class for the input itself
  errorClassName,
  name, // Ensure name is available for label's htmlFor
  id,   // Allow passing id directly, otherwise generate from name
  ...props
}) => {
  const defaultInputStyles =
    'w-full p-3 rounded-lg text-black bg-white text-base border-2 border-gray-300 focus:border-primary-color focus:ring-1 focus:ring-primary-color outline-none transition-colors';
  const errorInputStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const defaultErrorTextStyles = 'text-red-500 text-sm mt-1';

  const inputId = id || name || registration?.name;
  const errorId = error?.message && inputId ? `${inputId}-error` : undefined;

  return (
    <div className={clsx('mb-4', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx('block text-sm font-medium text-gray-700 mb-1', labelClassName)}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        {...registration} // Spread the output of RHF's register function
        {...props} // Spread other native input props
        className={clsx(
          defaultInputStyles,
          error && errorInputStyles,
          inputClassName // Allow user to override/extend styles
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
      />
      {error?.message && errorId && (
        <p id={errorId} className={clsx(defaultErrorTextStyles, errorClassName)}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
