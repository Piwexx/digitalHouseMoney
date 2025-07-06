import clsx from "clsx";
import { UseFormRegister, useFormContext } from 'react-hook-form'; // Added useFormContext
import { TransferWizardFormInputs } from '@/schemas/transferWizard';
import { ArrowLeft } from "lucide-react";
import Button from "@/app/src/ui/common/Button"; // Import the new Button component

interface Props {
  onNext: () => void;
  onBack: () => void;
  register: UseFormRegister<TransferWizardFormInputs>; // Still needed for direct registration
  error?: string;
}

export default function EnterAmountStep({ onNext, onBack, register, error }: Props) {
  // For more complex disabling logic based on value, we might need access to getValues or watch
  // If EnterAmountStep is always a child of a FormProvider from TransferWizard, we can use useFormContext
  // However, TransferWizard currently passes register directly.
  // For now, the disabled logic for the button will be simple based on 'error' presence.
  // A truly robust disable would be `!error && getValues('amount') > 0` passed from parent or via context.

  return (
    <div className="p-6 bg-secondary-color rounded-lg">
      <div className="flex flex-col">
        <Button
          type="button"
          variant="tertiary" // A text-like button for "Volver"
          onClick={onBack}
          className="mb-4 self-start px-0 py-0 text-primary-color hover:text-primary-color/80" // Custom styling for link-like
          leftIcon={<ArrowLeft className='w-4 h-4' />}
        >
          Volver
        </Button>
        <label htmlFor="amount" className="text-primary-color text-xl font-semibold mb-2 block">
          ¿Cuánto querés ingresar a la cuenta?
        </label>
        <input
          id="amount"
          type="number"
          placeholder="$0"
          {...register('amount', {
            valueAsNumber: true,
          })}
          className={clsx(
            "bg-white rounded-lg p-3 mt-4 w-full md:w-[300px] text-black text-base border-2 input-border",
            { "border-red-500": error }
          )}
          aria-invalid={error ? "true" : "false"}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <Button
          type="button"
          onClick={onNext}
          variant={error ? "secondary" : "primary"} // Example: secondary if error, primary otherwise
          disabled={!!error} // Simplified: disable if there's an error.
                            // A better disable logic would be `!!error || !getValues('amount')` from parent.
          className="mt-5 w-full md:w-[150px] md:self-end"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}