'use client'
import { CopyIcon } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

export default function IconCopy({copy}:{copy:string}) {
  
  const topRight = () => {
    toast.success('Hey 👋!, Copiado en clipboard ', {
        position: 'top-right',
    });
  };

  const topRightError = () => {
    toast.error('Hey 👋!, Error al copiar', {
          position: 'top-right',
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      topRight()
    } catch (err) {
      topRightError()
    }
  };

  return (
    <div>
      <button className="cursor-pointer" onClick={() => handleCopy(copy)}>
        <CopyIcon className="text-primary-color"/>
      </button>
       <ToastContainer />
    </div>
  )
}
