import React from 'react';
import clsx from 'clsx';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be displayed within the panel. */
  children: React.ReactNode;
  /** Optional CSS class names to apply to the panel's root div. */
  className?: string;
  /** Visual variant of the panel, affecting background and text colors. */
  variant?: 'default' | 'accent';
  /** Padding size for the panel content. */
  padding?: 'sm' | 'md' | 'lg' | 'none';
  /** Shadow intensity for the panel. */
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  /** Border radius size for the panel. */
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
}

/**
 * A flexible Panel component used as a styled container for content blocks.
 * It offers variants for background/text color, padding, shadow, and border radius.
 */
const Panel: React.FC<PanelProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md', // Default padding
  shadow = 'md',
  rounded = 'lg',
  ...props
}) => {
  const baseStyle = 'w-full';

  const variantStyles = {
    default: 'bg-white text-black',
    accent: 'bg-secondary-color text-white', // Example from AccountInfo
  };

  const paddingStyles = {
    sm: 'p-2',
    md: 'p-4', // Common default
    lg: 'p-6 md:p-8', // For larger panels like Profile
    none: 'p-0',
  };

  const shadowStyles = {
    sm: 'shadow-sm',
    md: 'shadow-md', // Common default
    lg: 'shadow-lg',
    none: 'shadow-none',
  };

  const roundedStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg', // Common default
    xl: 'rounded-xl',
    full: 'rounded-full',
    none: 'rounded-none',
  };

  return (
    <div
      className={clsx(
        baseStyle,
        variantStyles[variant],
        paddingStyles[padding],
        shadowStyles[shadow],
        roundedStyles[rounded],
        className // Allow overriding or adding custom classes
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Panel;
