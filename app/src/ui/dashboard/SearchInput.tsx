'use client'
import { LINK_BUTTON_ACTIVITY } from "@/constants/constants";
import { SearchCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
   const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(`${LINK_BUTTON_ACTIVITY.Actividad.href}?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <span className=" input-border border-2 flex items-center gap-2 bg-white rounded-xl mb-4 mt-4 ">
      <SearchCodeIcon className="w-6 h-6 text-gray-300 ml-2" />
      <input
      type="text"
      placeholder="Buscar en tu actividad"
      className='focus:outline-none focus:ring-0 focus:border-transparent  p-2 rounded-xl text-black bg-white text-base sm:text-lg sm:min-h-[64px] sm:min-w-[360px]  min-h-[50px]'
      value={searchValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
    </span>
  );
}