'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SearchCodeIcon } from 'lucide-react';
import Link from 'next/link';
import { LINK_BUTTON_ACTIONS } from '@/constants/constants';
import { formatDayOfWeek } from '@/utils/formatDayOfWeek';
import { ActivityItem } from '@/types/activity';
import { isWithinPeriod } from '@/utils/isWithinPeriod';

const periods = [
  'Hoy',
  'Ayer',
  'Última semana',
  'Últimos 15 días',
  'Último mes',
  'Último año',
];

interface props {
  activities: ActivityItem[]
}

export default function ActivityList({activities}:props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [filteredPeriod, setFilteredPeriod] = useState('Último año');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  // Lee ?query= al cargar
  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    setSearch(initialQuery);
  }, [searchParams]);

  const filteredData = activities.filter(
    (item) =>
      item.description.toLowerCase().includes(search.toLowerCase()) &&
      isWithinPeriod(item.dated, filteredPeriod)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='p-8 w-full'>
      {/* Search and Filter Button */}
      <div className='flex gap-4 items-center mb-6'>
        <span className=" input-border border-2 flex items-center gap-2 bg-white rounded-xl mb-4 mt-4 w-full">
          <SearchCodeIcon className="w-6 h-6 text-gray-300 ml-2" />
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className='focus:outline-none focus:ring-0 focus:border-transparent  p-2 rounded-xl text-black bg-white text-base h-[64px] sm:text-lg'
            value={search}
            onChange={handleSearchChange}
           />
        </span>
        <div 
          onClick={() => setShowFilters(!showFilters)}
          className='hidden  sm:flex justify-center items-center gap-4 bg-primary-color rounded-xl p-2  min-w-[150px] h-[64px]'>
          <button
            className='font-bold text-black text-base '
          >
            Filtrar
          </button>
          <Filter className='text-black text-base font-bold w-4 h-4'/>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className='bg-gray-100 shadow self-start place-self-end rounded-xl p-4 w-[250px] absolute mt-15 sm:mt-0'>
          <div className='flex justify-between items-center border-b-1 border-gray-300 mb-4'>
            <h4 className='text-black font-bold text-sm mb-4'>Periodo</h4>
            <button 
              onClick={
                () => {
                  setFilteredPeriod('Último año')
                  setShowFilters(false)
                }
              }
              className='text-gray-500  text-sm mb-4'>
              Borrar filtros
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            {periods.map((p) => (
              <label
                key={p}
                className='text-gray-600 flex flex-row-reverse justify-between items-center gap-2 mb-2'
              >
                <input
                  className='outline-black '
                  type='radio'
                  name='period'
                  checked={filteredPeriod === p}
                  onChange={() => setFilteredPeriod(p)}
                />
                {p}
              </label>
            ))}
          </div>
          <button
            onClick={() => {
              setCurrentPage(1);
              setShowFilters(false);
            }}
            className='mt-4 w-full bg-primary-color rounded-xl p-2 text-black text-sm font-semibold'
          >
            Aplicar
          </button>
        </div>
      )}

      {/* Activity List */}
      <div className='rounded-xl w-full bg-white shadow flex flex-col min-h-[300px] p-2'>
        <div className='flex justify-between items-center p-4 border-b-1 border-gray-100'>
            <h3 className='text-black text-base font-bold'>Tu actividad</h3>
            <div 
              onClick={() => setShowFilters(!showFilters)}
              className='sm:hidden flex justify-center items-center gap-4'>
              <button
                className='font-bold text-black text-base border-b-1 border-black'
              >
                Filtrar
              </button>
              <Filter className='text-black text-base font-bold w-4 h-4'/>
          </div>
        </div>
        {paginatedData.map((item) => ( 
          <Link href={`${LINK_BUTTON_ACTIONS.Detail.href}?query=${item.id}`} key={item.id}>
            <div
              className='border-b-1 border-gray-100 p-4 flex justify-between items-center '
            >
              <div className='flex flex-row  items-center gap-2'>
                <span className="text-secondary-color w-4 h-4 bg-primary-color rounded-full" />
                <div className=' text-black  text-base'>
                  {item.description}
                </div>
              </div>
              <div className='text-right'>
                <div className='text-black'>
                  {item.amount < 0 ? '-' : '+'}$ {Math.abs(item.amount).toFixed(2)}
                </div>
                <div className='text-gray-400 text-sm'>{formatDayOfWeek(item.dated)}</div>
              </div>
            </div>
          </Link>
        ))}
        {/* Pagination */}
      <div className='flex justify-center items-center mt-4 mb-4 gap-2 '>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`text-black px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-gray-200' : 'bg-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
