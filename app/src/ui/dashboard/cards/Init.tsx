import { LINK_BUTTON_ACTIONS } from "@/constants/constants";
import { ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Init() {
  return (
    <div className="bg-secondary-color text-white rounded-lg p-8 flex flex-col justify-between">
      <div className="text-xl font-bold space-x-3 mb-4">
        <p>Agregá tu tarjeta de débito o crédito</p>
      </div>
      <Link href={LINK_BUTTON_ACTIONS["Nueva Tarjeta"].href}>
        <div className="mt-4 flex justify-between">
          <div className="flex">
            <PlusCircle className="text-primary-color w-8 h-8"/>
            <p className="ml-5 text-xl text-primary-color font-bold">{LINK_BUTTON_ACTIONS["Nueva Tarjeta"].label}</p>
          </div>
        <ArrowRight className="text-primary-color w-8 h-8"/>
      </div>
      </Link>
    </div>
  );
}