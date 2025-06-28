import { LINK_BUTTON_ACTIONS } from "@/constants/constants";
import { ActivityItem } from "@/types/activity";
import { parseDate } from "@/utils/parseDate";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface props {
  activity: ActivityItem
}

export default function DetailActivity({activity}:props) {
  return (
    <>
      <div className="flex flex-col bg-secondary-color mt-4 rounded-xl p-8">
        <div className="flex flex-col justify-between md:flex-row-reverse">
          <p className="text-gray-300 text-sm self-end mb-4 md:mb-0">{"Creada " + parseDate(new Date(activity.dated))}</p>
          <div className="flex gap-2 items-center">
            <CircleCheck className="w-6 h-6 text-primary-color font-bold"/>
            <p className="text-primary-color text-base">{"Aprobada"}</p>
          </div>
        </div>
        <div className="border-b-1 border-gray-300 mt-2"></div>
        <div className="mt-4 flex flex-col">
          <p className="text-base text-white font-bold">{activity.type}</p>
          <p className="text-base text-primary-color font-bold">${activity.amount}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-sm text-white">Le transferiste a </p>
          <p className="text-xl text-primary-color font-semibold">{activity.destination}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-sm text-white">Número de operación</p>
          <p className="text-sm text-primary-color">{activity.id}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col-reverse gap-2 justify-between items-center sm:flex-row sm:justify-end">
        <Link href={LINK_BUTTON_ACTIONS.Inicio.href} className="bg-gray-300 text-black text-base p-4 rounded-lg font-semi w-full sm:w-[250px] text-center">{LINK_BUTTON_ACTIONS.Inicio.label}</Link>
        <Link href={""} className="bg-primary-color p-4 rounded-lg text-black text-base font-semibold w-full sm:w-[250px] text-center">Descargar comprobante</Link>
      </div>
    </>
  );
}