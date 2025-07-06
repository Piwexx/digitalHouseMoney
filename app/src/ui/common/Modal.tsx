'use client'; // Modals are interactive and manage their own state / side effects

import React, { useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import Button from './Button';

export interface ModalProps {
  /** Controls whether the modal is visible or hidden. */
  isOpen: boolean;
  /** Function to call when the modal requests to be closed (e.g., by backdrop click, Esc key, or close button). */
  onClose: () => void;
  /** Optional title displayed in the modal header. */
  title?: string;
  /** The main content of the modal. */
  children: React.ReactNode;
  /** Optional footer content, typically for action buttons. */
  footer?: React.ReactNode;
  /** Specifies the maximum width of the modal. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional CSS class name for the main dialog panel, allowing style overrides. */
  dialogClassName?: string;
  /** Optional ID for the modal title element, used for `aria-labelledby`. Defaults to 'modal-title'. */
  titleId?: string;
  /** Optional ID for the modal description/content element, used for `aria-describedby`. Defaults to 'modal-description'. */
  descriptionId?: string;
}

/**
 * A reusable Modal component for displaying dialogs.
 * Features include visibility control, title, content, optional footer,
 * size variations, and accessibility attributes (ARIA, Escape key, basic focus management).
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  dialogClassName,
  titleId = 'modal-title', // Default ID
  descriptionId = 'modal-description', // Default ID
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null); // Ref for the close button
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleEscapeKey);
      // Focus the close button by default, or the modal itself if no close button (e.g. titleless modal)
      (closeButtonRef.current || modalRef.current)?.focus();
      // TODO: Implement a full focus trap to keep focus within the modal
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
      previouslyFocusedElement.current?.focus(); // Return focus
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={children ? descriptionId : undefined} // Assuming children act as description if no specific one
      onClick={onClose} // Close on backdrop click
    >
      <div
        ref={modalRef}
        tabIndex={-1} // Make it focusable
        className={clsx(
          'relative w-full rounded-lg bg-white shadow-xl flex flex-col max-h-[90vh]',
          sizeClasses[size],
          dialogClassName
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            {title && (
              <h2 id={titleId} className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            <Button
              ref={closeButtonRef} // Attach ref here
              variant="tertiary"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-1 -mr-2 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </Button>
          </div>
        )}

        {/* Body */}
        <div id={descriptionId} className="flex-grow overflow-y-auto p-4 md:p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-shrink-0 items-center justify-end space-x-2 border-t border-gray-200 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
