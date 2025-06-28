'use client'
import { LINKS } from '@/constants/constants'
import clsx from 'clsx'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type userInfo = {
  id: number,
  firstname: string,
  lastname: string,
  dni: number,
  email: string,
  phone: string
}
interface Props {
  userInfo?:userInfo,
}

export default function Header({userInfo }:Props) {
  const path = usePathname()
  const inHome = path === '/'
  const inDashboard = path.includes('/dashboard')
  const inRegister = path === '/register'

  const userName = userInfo?.firstname + ' ' + userInfo?.lastname

  const headerClass = clsx(
    'bg-primary-color w-full flex items-center justify-between px-6 py-4 relative z-20 max-h-[64px] min-h-[64px]',
    {
      'bg-secondary-color': inHome || inDashboard,
    }
  )

  return (
    <>
      <header className={headerClass}>
        <div className='flex items-center w-full justify-between'>
         <Link 
          href={LINKS.home}>
            <Image
              src={inHome || inDashboard? '/logo.png' : '/logo_black.png'}
              alt='Logo DMH'
              width={120}
              height={40}
              className='h-auto w-auto'
            />
         </Link>
         {inDashboard && (
          <div className="flex items-center gap-2">
            <Link href={LINKS.dashboard}>
              <div className="bg-primary-color text-black rounded-xl m-2 w-8 h-8 flex items-center justify-center font-bold text-lg">
                {userName.split(" ").map((word) => word[0]).join("")}
              </div>
           </Link>
          <p className="text-white text-lg hidden md:block">Hola, {userInfo?.firstname} {userInfo?.lastname}</p>
            <label htmlFor="sidebar-toggle" className="md:hidden cursor-pointer z-50">
                <div className="peer-checked:hidden block">
                  <Menu className="w-6 h-6" />
                </div>
            </label>
          </div>
         )}
         {inHome && <div className='flex justify-end gap-4'>
            <Link
              href={LINKS.login}
              className='cursor-pointer text-sm border-primary-color border-1 text-primary-color font-bold px-4 py-2 rounded-lg hover:bg-black transition max-h-[40px]'
            >
              Ingresar
            </Link>
            <Link
              href={LINKS.register}
              className='cursor-pointer text-sm btn-primary text-black font-semibold border px-4 py-2 rounded-lg hover:bg-gray-100 transition max-h-[40px]'
            >
              Crear cuenta
            </Link>
          </div>
        }
        {inRegister && <div className='flex justify-end gap-4'>
            <Link
              href={LINKS.login}
              className=' text-sm btn-secondary text-white font-bold px-4 py-2 rounded-lg transition max-h-[40px] min-w-[133px] text-center'
            >
              Iniciar sesión
            </Link>
          </div>
         }
        </div>
      </header>
    </>
  )
}
