import { LINK_BUTTON_ACTIONS} from "@/constants/constants";
import { Card } from "@/types/card";
import { Service } from "@/types/service";
import { parseDate } from "@/utils/parseDate";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface props {
 service: Service
 card:Card
}

export default function SuccessStep({ service, card }: props) {
  
  const ocultarTarjeta = () =>  {
    const ultimosCuatro = String(card.number_id).slice(-4);
    return '**** **** **** ' + ultimosCuatro;
  }

  return (
    <>
      <div className=" flex flex-col gap-2 p-4 justify-center items-center bg-primary-color text-black p-4 rounded-xl text-center font-bold">
        <CircleCheck className="w-16 h-16 font-bold mt-2"/>
        <p className="text-black text-2xl"> Ya realizaste tu pago</p>
      </div>
      <div className="flex flex-col bg-secondary-color mt-4 rounded-xl p-8">
        <p className="text-white text-bases">{parseDate(new Date(service.date))}</p>
        <p className="text-primary-color text-xl font-semibold">${service.invoice_value}</p>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-sm text-gray-300">Para</p>
        <p className="text-xl text-primary-color font-bold">{service.name}</p>
      </div>
      <div className="flex flex-col mt-4">
        <p className="text-base text-white">Tarjeta</p>
        <p className="text-sm text-white">{ocultarTarjeta()}</p>
      </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 justify-between items-center sm:flex-row-reverse sm:justify-start">
        <Link href={""} className="bg-primary-color p-4 rounded-lg text-black text-base font-semibold w-full sm:w-[250px] text-center">Descargar comprobante</Link>
        <Link 
          href={LINK_BUTTON_ACTIONS.Inicio.href} 
          className="bg-gray-300 text-black text-base p-4 rounded-lg font-semi w-full sm:w-[250px] text-center"
          >
            {LINK_BUTTON_ACTIONS.Inicio.label}
          </Link>
      </div>
    </>
  );
}