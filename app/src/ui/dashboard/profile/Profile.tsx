'use client'
import { schemaEditProfile } from "@/schemas/editProfile";
import { patchUserInfo } from "@/services/userInfo";
import { User } from "@/types/user";
import { Edit, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ValidationError } from "yup";
import { ToastContainer, toast } from 'react-toastify';


interface Props {
  userInfo: User;
  token: string
}

export default function Profile({ userInfo, token }: Props) {
  const router = useRouter()
  
  const [editField, setEditField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
    phone: userInfo.phone,
    email: userInfo.email,
    dni:userInfo.dni
  });

  const topRight = () => {
      toast.success('Hey 👋!, Perfil actualizado', {
        position: 'top-right',
      });
  };

  const topRightError = () => {
        toast.error('Hey 👋!, Error al guardar', {
          position: 'top-right',
        });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      
      setErrors({});
      
      await schemaEditProfile.validate(formData, { abortEarly: false });
      
      await patchUserInfo(userInfo.id,formData,{},token)
      
      setEditField(null);

      topRight()

     router.refresh();
    } catch (err) {
        if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        topRightError()
      }
    }
  };

  const renderRow = (
    label: string,
    field: keyof typeof formData,
    type: 'text' | 'password' = 'text'
  ) => (
    <div className="flex items-center justify-between border-b border-gray-200 p-3">
      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
        <p className="text-lg font-bold w-48">{label}</p>
        {editField === field ? (
          <>
          <input
            type={type}
            className="border-1 border-gray-200 rounded p-3 w-full"
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
           {editField === field && errors[field] && (
            <p className="text-sm text-red-500">{errors[field]}</p>
          )}
          </>
        ) : (
          <p className="text-lg truncate">
            {formData[field]}
          </p>
        )}
      </div>
      <button
        className="ml-2"
        onClick={() =>
          editField === field ? handleSave() : setEditField(field)
        }
      >
        {editField === field ? <Save size={20} /> : <Edit size={20} />}
      </button>
    </div>
  );

  return (
    <div className="bg-white text-black rounded-lg p-8 mt-4 flex flex-col justify-between min-h-[280px]">
      <div className="text-xl font-bold mb-4">
        <p>Tus datos</p>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-200 p-3">
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
            <p className="text-lg font-bold w-48">Email</p>
            <p className="text-lg truncate">{userInfo.email}</p>
          </div>
        </div>

        {/* Nombre */}
        {renderRow("Nombre", "firstname")}

        {/* Apellido */}
        {renderRow("Apellido", "lastname")}

        {/* Teléfono */}
        {renderRow("Teléfono", "phone")}
         {/* Email (solo lectura) */}
        <div className="flex items-center justify-between border-b border-gray-200 p-3">
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
            <p className="text-lg font-bold w-48">Contraseña</p>
            <p className="text-lg truncate">{"*******"}</p>
          </div>
        </div>
      </div>
       <ToastContainer />
    </div>
  );
}