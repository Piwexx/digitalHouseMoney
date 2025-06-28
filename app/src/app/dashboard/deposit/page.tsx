import { LINK_BUTTON_ACTIONS } from '@/constants/constants'
import Init from '@/ui/dashboard/deposits/Init'
import { IdCard, UserRound } from 'lucide-react'

export default function page() {
  return (
    <>
       <div className='flex flex-col gap-4'>
        <Init link={LINK_BUTTON_ACTIONS['Transferencia Bancaria']}>
        {<UserRound className="text-primary-color w-8 h-8"/>}
        </Init>
        <Init link={LINK_BUTTON_ACTIONS['Seleccionar tarjeta']}>
          <IdCard className="text-primary-color w-8 h-8"/>
        </Init>
      </div>
    </>
  )
}

