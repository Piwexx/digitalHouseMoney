import React from 'react';
import clsx from 'clsx';
import { LucideProps } from 'lucide-react'; // For icon type

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive-tertiary';
type ButtonSize = 'medium' | 'large'; // Simplified for now

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize; // May not be strictly needed if padding and fullWidth handle most cases
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactElement<LucideProps>; // For icons like ArrowLeft
  rightIcon?: React.ReactElement<LucideProps>; // For icons like Filter
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'flex items-center justify-center font-bold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-primary-color text-black hover:bg-primary-color/90 focus:ring-primary-color/50 disabled:bg-primary-color/70', // Assuming primary-color is a defined Tailwind color
    secondary:
      'bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-400/50 disabled:bg-gray-300/70',
    tertiary: // For text-like buttons, e.g., "Volver"
      'bg-transparent text-gray-600 hover:text-gray-800 focus:ring-gray-500/50 disabled:text-gray-400',
    'destructive-tertiary': // For "Eliminar" text button
      'bg-transparent text-red-600 hover:text-red-700 focus:ring-red-600/50 disabled:text-red-400',
  };

  const sizeStyles = { // These are approximate based on observed components
    medium: 'px-4 py-2 text-base min-h-[50px]', // Default/Medium size
    large: 'px-4 py-3 text-base sm:text-lg min-h-[50px] sm:min-h-[64px]', // Matches form buttons
  };

  // Specific style from LoginForm for primary buttons, can be part of 'large' or a specific prop
  const largeFormButtonStyles = "sm:min-w-[360px] min-w-[300px]";


  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        // Apply largeFormButtonStyles if variant is primary and size is large (example logic)
        variant === 'primary' && size === 'large' && fullWidth && largeFormButtonStyles,
        disabled && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {leftIcon && !isLoading && React.cloneElement(leftIcon, { className: clsx(leftIcon.props.className, 'mr-2') })}
      {children}
      {rightIcon && !isLoading && React.cloneElement(rightIcon, { className: clsx(rightIcon.props.className, 'ml-2') })}
    </button>
  );
};

export default Button;
