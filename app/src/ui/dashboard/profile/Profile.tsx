'use client';
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldNameValue, Path } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { schemaEditProfile } from "@/schemas/editProfile";
import { patchUserInfo } from "@/services/userInfo";
import { User } from "@/types/user";
import { Edit, Save, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import clsx from "clsx";
import Button from "../../common/Button";
import { useAuth } from "@/context/AuthContext"; // Import useAuth

interface Props {
  // userInfo and token will come from context
  // However, Profile component displays userInfo.id, .email, .dni which are not in schemaEditProfile
  // So, it still needs the full userInfo for display purposes.
  // The token for patchUserInfo will come from context.
  // The initial form values will also come from the context's user object.
   userInfo: User; // Keep userInfo for display of non-editable fields like email/DNI
}

type ProfileFormInputs = yup.InferType<typeof schemaEditProfile>;

// Props for Profile component might need adjustment based on what AuthContext provides vs what Profile displays directly.
// For this refactor, we assume `userInfo` prop is still passed for read-only fields not in the form schema,
// but `token` and `user.id` for API calls will come from context.
// Form's default values will also use context's user.

export default function Profile({ userInfo: propUserInfo }: Props) { // Renamed prop to avoid clash
  const router = useRouter();
  const { user:authUser, token } = useAuth(); // Get user and token from context

  const [editField, setEditField] = useState<Path<ProfileFormInputs> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // No separate serverError state, RHF errors will show field errors, toast for general.

  const {
    register,
    handleSubmit: hookFormSubmit, // Not used for per-field save, but good to have if a full form submit was ever needed
    formState: { errors, dirtyFields },
    setValue,
    trigger,
    getValues,
    reset, // To reset form to original/updated values
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schemaEditProfile),
    mode: 'onChange',
    defaultValues: { // Initialize with propUserInfo, then update with authUser if available
      firstname: authUser?.firstname || propUserInfo.firstname,
      lastname: authUser?.lastname || propUserInfo.lastname,
      phone: authUser?.phone || propUserInfo.phone,
    },
  });

  // Effect to update form default values if authUser or propUserInfo prop changes
  useEffect(() => {
    const userForForm = authUser || propUserInfo;
    reset({
      firstname: userForForm.firstname,
      lastname: userForForm.lastname,
      phone: userForForm.phone,
    });
  }, [authUser, propUserInfo, reset]);

  const handleEdit = (field: Path<ProfileFormInputs>) => {
    setEditField(field);
  };

  const handleCancelEdit = () => {
    if (editField) {
      const userForReset = authUser || propUserInfo;
      // Reset the field to its original value from userForReset (preferring authUser)
      reset({ ...getValues(), [editField]: userForReset[editField as keyof User] as FieldNameValue<ProfileFormInputs, Path<ProfileFormInputs>> });
    }
    setEditField(null);
  };

  const handleSave = async (fieldToSave: Path<ProfileFormInputs>) => {
    if (!authUser || !token) {
      toast.error("No se pudo autenticar la acción. Intenta de nuevo.");
      return;
    }

    setIsLoading(true);
    const isValid = await trigger(fieldToSave);

    if (isValid) {
      const currentValue = getValues(fieldToSave);
      const payload = { [fieldToSave]: currentValue };

      try {
        await patchUserInfo(authUser.id, payload, {}, token); // Use authUser.id and token from context
        toast.success('Perfil actualizado', { position: 'top-right' });
        setEditField(null);
        router.refresh(); // Re-fetches data and updates Server Components
        // After refresh, useEffect will update form's defaultValues with new userInfo
      } catch (err) {
        console.error("Profile update error:", err);
        toast.error('Error al guardar los cambios', { position: 'top-right' });
        // Optionally, reset field to original value on save error
        // resetField(fieldToSave, { defaultValue: userInfo[fieldToSave as keyof User] });
      }
    }
    setIsLoading(false);
  };

  const renderRow = (
    label: string,
    field: Path<ProfileFormInputs>,
    displayValue?: string | number // For fields like DNI or email that are not directly from RHF state for editing
  ) => {
    const isEditingThisField = editField === field;
    const currentValue = displayValue !== undefined ? displayValue : getValues(field);

    return (
      <div className="flex items-center justify-between border-b border-gray-200 p-3 min-h-[70px]">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
          <p className="text-lg font-bold w-full md:w-48">{label}</p>
          {isEditingThisField ? (
            <div className="w-full">
              <input
                {...register(field)}
                type={'text'} // All editable fields in schema are strings
                className={clsx("border-1 border-gray-300 rounded p-2 w-full text-black", {
                  "border-red-500": errors[field]
                })}
                aria-invalid={errors[field] ? "true" : "false"}
                disabled={isLoading}
              />
              {errors[field] && (
                <p className="text-sm text-red-500 mt-1">{errors[field]?.message}</p>
              )}
            </div>
          ) : (
            <p className="text-lg truncate w-full">{currentValue}</p>
          )}
        </div>
        <div className="flex gap-2 ml-2">
          {isEditingThisField ? (
            <>
              <Button
                variant="tertiary"
                onClick={() => handleSave(field)}
                disabled={isLoading || (!dirtyFields[field] && getValues(field) === (authUser || propUserInfo)[field as keyof User])}
                className="p-1 text-green-600 hover:text-green-800 disabled:text-green-600/50"
                aria-label={`Guardar ${label}`}
              >
                <Save size={20} />
              </Button>
              <Button
                variant="tertiary"
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="p-1 text-red-600 hover:text-red-800"
                aria-label={`Cancelar edición de ${label}`}
              >
                <XCircle size={20} />
              </Button>
            </>
          ) : (
            <Button
              variant="tertiary"
              onClick={() => handleEdit(field)}
              disabled={isLoading}
              className="p-1 text-blue-600 hover:text-blue-800"
              aria-label={`Editar ${label}`}
            >
              <Edit size={20} />
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Displaying DNI and Email as read-only from userInfo prop
  const renderReadOnlyRow = (label: string, value: string | number) => (
     <div className="flex items-center justify-between border-b border-gray-200 p-3 min-h-[70px]">
      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
        <p className="text-lg font-bold w-full md:w-48">{label}</p>
        <p className="text-lg truncate w-full">{value}</p>
      </div>
       {/* Placeholder for consistent spacing with action buttons */}
      <div className="w-[52px] ml-2"></div>
    </div>
  )

  return (
    <div className="bg-white text-black rounded-lg p-4 md:p-8 mt-4 flex flex-col justify-between">
      <div className="text-xl font-bold mb-4">
        <p>Tus datos</p>
      </div>
      <div className="mt-4 flex flex-col gap-2 md:gap-4">
        {renderReadOnlyRow("DNI", userInfo.dni)}
        {renderReadOnlyRow("Email", userInfo.email)}
        {renderRow("Nombre", "firstname")}
        {renderRow("Apellido", "lastname")}
        {renderRow("Teléfono", "phone")}
        {renderReadOnlyRow("Contraseña", "••••••••")}
      </div>
      {/* <ToastContainer /> Ensure this is global */}
    </div>
  );
}