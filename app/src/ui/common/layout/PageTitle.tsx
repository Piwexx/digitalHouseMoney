import React from 'react';
import clsx from 'clsx';

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The text content of the title. */
  children: React.ReactNode;
  /** Specifies the HTML heading element to render (h1-h6). Defaults to 'h1'. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Optional CSS class names to apply to the heading element. */
  className?: string;
}

/**
 * A reusable PageTitle component for rendering styled heading elements (h1-h6).
 * It applies default styling for boldness and text color, and size-specific margins.
 */
const PageTitle: React.FC<PageTitleProps> = ({
  children,
  as: Component = 'h1',
  className,
  ...props
}) => {
  const baseStyle = 'font-bold text-black'; // Base style for most titles seen

  // Size examples, can be expanded or made props
  const sizeStyles = {
    h1: 'text-2xl md:text-3xl mb-6', // Common page title size
    h2: 'text-xl md:text-2xl mb-4', // Section title
    h3: 'text-lg md:text-xl mb-3', // Sub-section or card title
    h4: 'text-base md:text-lg mb-2',
    h5: 'text-sm md:text-base mb-2',
    h6: 'text-xs md:text-sm mb-1',
  };

  return (
    <Component
      className={clsx(
        baseStyle,
        sizeStyles[Component], // Apply size based on the 'as' prop
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default PageTitle;
