'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SearchCodeIcon } from 'lucide-react';
// Link is now part of ActivityListItemDisplay
// import Link from 'next/link';
import { ActivityItem } from '@/types/activity';
import ActivityListItemDisplay from './ActivityListItemDisplay';
import { isWithinPeriod } from '@/utils/isWithinPeriod';
import Button from '@/app/src/ui/common/Button';
import Panel from '@/app/src/ui/common/layout/Panel';
import PageTitle from '@/app/src/ui/common/layout/PageTitle'; // Import PageTitle

// Basic debounce utility
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => resolve(func(...args)), waitFor);
    });
import { ACTIVITY_FILTER_PERIODS, ACTIVITY_ITEMS_PER_PAGE } from '@/constants/constants';


interface Props {
  activities: ActivityItem[];
}

export default function ActivityList({ activities }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // Initialize filteredPeriod with one of the constant values, e.g., the last one
  const [filteredPeriod, setFilteredPeriod] = useState(ACTIVITY_FILTER_PERIODS[ACTIVITY_FILTER_PERIODS.length - 1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  // itemsPerPage is now from constants

  // Effect to read initial search query from URL
  useEffect(() => {
    const initialQuery = searchParams.get('query') || '';
    setSearch(initialQuery);
    setDebouncedSearch(initialQuery); // Initialize debounced search as well
  }, [searchParams]);

  const filteredData = useMemo(() => {
    return activities.filter(
      (item) =>
        item.description.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        isWithinPeriod(item.dated, filteredPeriod)
    );
  }, [activities, debouncedSearch, filteredPeriod]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * ACTIVITY_ITEMS_PER_PAGE,
      currentPage * ACTIVITY_ITEMS_PER_PAGE
    );
  }, [filteredData, currentPage]); // Removed itemsPerPage from deps as it's a constant

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / ACTIVITY_ITEMS_PER_PAGE);
  }, [filteredData]); // Removed itemsPerPage from deps

  // Debounced function to update URL and actual search term for filtering
  const updateSearchQuery = useCallback((query: string) => {
    setDebouncedSearch(query);
    setCurrentPage(1); // Reset to first page on new search
    const params = new URLSearchParams(searchParams.toString()); // Use toString() to get current params
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    router.push(`?${params.toString()}`, { scroll: false }); // Add scroll: false if undesired
  }, [router, searchParams]);

  const debouncedUpdateSearchQuery = useMemo(
    () => debounce(updateSearchQuery, 300),
    [updateSearchQuery]
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // Update input field immediately
    debouncedUpdateSearchQuery(value); // Debounce the actual filtering logic
  };

  const handlePeriodChange = useCallback((period: string) => {
    setFilteredPeriod(period);
    setCurrentPage(1); // Reset to first page when period changes
  }, []);

  const handleApplyFilters = useCallback(() => {
    // `filteredPeriod` is already up-to-date due to handlePeriodChange
    // `search` (via `debouncedSearch`) is also up-to-date
    // Simply close the filter panel and ensure pagination is reset
    setCurrentPage(1);
    setShowFilters(false);
  }, []);


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
        <Button
          variant="primary"
          size="large" // to match the h-[64px]
          className='hidden sm:flex min-w-[150px]' // Keep original layout classes
          onClick={() => setShowFilters(!showFilters)}
          rightIcon={<Filter className='w-4 h-4'/>}
        >
          Filtrar
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className='bg-gray-100 shadow self-start place-self-end rounded-xl p-4 w-[250px] absolute mt-15 sm:mt-0'>
          <div className='flex justify-between items-center border-b-1 border-gray-300 mb-4'>
            <h4 className='text-black font-bold text-sm mb-4'>Periodo</h4>
            <Button
              variant="tertiary"
              onClick={() => {
                handlePeriodChange('Último año'); // Use existing handler if possible
                setShowFilters(false);
              }}
              className="text-sm mb-4 px-0 py-0" // Adjust padding for text-like
            >
              Borrar filtros
            </Button>
          </div>
          <div className='flex flex-col gap-2'>
            {ACTIVITY_FILTER_PERIODS.map((p) => (
              <label
                key={p}
                className='text-gray-600 flex flex-row-reverse justify-between items-center gap-2 mb-2'
              >
                <input
                  className='outline-black ' // Consider custom focus ring for better visibility
                  type='radio'
                  name='period'
                  value={p} // Add value attribute
                  checked={filteredPeriod === p}
                  onChange={() => handlePeriodChange(p)} // Use existing handler
                />
                {p}
              </label>
            ))}
          </div>
          <Button
            variant="primary"
            onClick={handleApplyFilters} // Use the useCallback wrapped handler
            fullWidth
            className="mt-4 text-sm" // text-sm was on original
            size="medium" // Check if size medium provides p-2 equivalent
          >
            Aplicar
          </Button>
        </div>
      )}

      {/* Activity List */}
      <Panel
        padding="sm" // original p-2
        rounded="xl" // original rounded-xl
        shadow="md"   // original shadow (assuming default md is similar)
        className="flex flex-col min-h-[300px]" // Keep flex specific styles and min-height
      >
        <div className='flex justify-between items-center p-4 border-b-1 border-gray-100'>
            <PageTitle as="h3" className="text-base mb-0">Tu actividad</PageTitle>
            {/* mb-0 to override default margin from PageTitle if not needed here */}
            {/* This button is a div with an onClick, could be a Button component if styled appropriately */}
            <Button
              variant="tertiary" // or a new 'link' variant if desired
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden px-0 py-0" // Compact, text-like
              rightIcon={<Filter className='w-4 h-4'/>}
            >
                <span className="border-b-1 border-black">Filtrar</span> {/* Keep underline style */}
            </Button>
        </div>
        {paginatedData.length === 0 && debouncedSearch && (
          <p className="p-4 text-center text-gray-500">No se encontraron actividades para tu búsqueda.</p>
        )}
        {paginatedData.length === 0 && !debouncedSearch && filteredData.length === 0 && (
           <p className="p-4 text-center text-gray-500">No hay actividades en el período seleccionado.</p>
        )}
         {paginatedData.length === 0 && !debouncedSearch && activities.length === 0 && (
           <p className="p-4 text-center text-gray-500">No tienes actividad registrada aún.</p>
        )}
        {paginatedData.map((item) => (
          <ActivityListItemDisplay key={item.id} item={item} />
        ))}
        {/* Pagination */}
      {totalPages > 0 && ( // Only show pagination if there are pages
        <div className='flex justify-center items-center mt-4 mb-4 gap-2 '>
      )}
      {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'secondary' : 'tertiary'} // Example: active is secondary
            size="medium" // Or a new 'small' or 'pagination' size
            onClick={() => setCurrentPage(i + 1)}
            className={clsx("px-3 py-1", {
              "bg-gray-200 text-black": currentPage === i + 1, // Active state
              "bg-white text-black hover:bg-gray-100": currentPage !== i + 1, // Inactive state
            })}
          >
            {i + 1}
          </Button>
        ))}
      {totalPages > 0 && (
        </div>
      )}
      </div>
    </div>
  );
}