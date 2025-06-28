'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LINKS_DASHBOARD } from '@/constants/constants';


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
    <input type="checkbox" id="sidebar-toggle" className="hidden peer" />
    <aside className="bg-primary-color text-black py-6 px-4
      min-h-screen
      fixed top-0 left-0 z-40
      w-70
      -translate-x-full
      peer-checked:translate-x-0
      
      md:transition-none
      md:static
      md:translate-x-0
      md:block
    ">
        <nav className="flex flex-col gap-4 text-base font-medium ml-3">
          {LINKS_DASHBOARD.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
             className={clsx('hover:underline', {
              'font-bold text-black':
                href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname === href || pathname.startsWith(href + '/'),
              'text-gray-800':
                !(href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname === href || pathname.startsWith(href + '/')),
            })}
            >
              {label}
            </Link>
          ))}
          <Link href="/logout" className="mt-4 text-gray-500 hover:underline text-base">
            Cerrar sesión
          </Link>
        </nav>
      </aside>
    </>
  );
}