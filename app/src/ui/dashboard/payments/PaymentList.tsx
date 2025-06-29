'use client';
import { useState } from 'react';
import { SearchCodeIcon } from 'lucide-react';
import { Service } from '@/types/service';

interface props {
  services: Service[];
  onNext: () => void
  onSubmit: (a:number) => void
}

export default function PaymentList({ services, onNext, onSubmit }: props) {
  const [search, setSearch] = useState<string>('');

  const filteredData = services.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className='p-8 w-full'>
      {/* Search Button */}
      <div className='flex gap-4 items-center mb-6'>
        <span className=' input-border border-2 flex items-center gap-2 bg-white rounded-xl mb-4 mt-4 w-full'>
          <SearchCodeIcon className='w-6 h-6 text-gray-300 ml-2' />
          <input
            type='text'
            placeholder='Buscá entre más de 5.000 empresas'
            className='focus:outline-none focus:ring-0 focus:border-transparent  p-2 rounded-xl text-black bg-white text-base h-[64px] sm:text-lg'
            value={search}
            onChange={handleSearchChange}
          />
        </span>
      </div>

      {/* Services List */}
      <div className='rounded-xl w-full bg-white shadow flex flex-col min-h-[300px] p-2'>
        <div className='flex justify-between items-center p-4 border-b-1 border-gray-100'>
          <h3 className='text-black text-base font-bold'>Mas recientes</h3>
        </div>
        {filteredData.map((item) => (
          <div key={item.id} className='border-b-1 border-gray-100 p-4 flex justify-between items-center '>
            <div className='flex flex-row  items-center gap-2'>
              <div className=' text-black  text-base'>{item.name}</div>
            </div>
            <div className='text-right'>
              <div className='text-black'>
                <button 
                  onClick={
                    () => {
                      onSubmit(item.id)
                      onNext()
                    }}
                  className='text-black text-base font-bold'
                  >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
