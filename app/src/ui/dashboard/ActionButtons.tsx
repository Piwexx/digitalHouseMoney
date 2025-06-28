import { LINK_BUTTON_ACTIONS } from "@/constants/constants";
import Link from "next/link";

export default function ActionButtons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 justify-center">
      <Link href={LINK_BUTTON_ACTIONS["Cargar dinero"].href} className="flex items-center justify-center text-base md:text-xl  bg-primary-color text-secondary-color py-4 rounded-xl font-bold min-h-[106px]">{LINK_BUTTON_ACTIONS["Cargar dinero"].label}</Link>
      <Link href={LINK_BUTTON_ACTIONS["Pagar Servicios"].href} className="flex items-center justify-center text-base md:text-xl bg-primary-color text-secondary-color  py-4 rounded-xl font-bold min-h-[106px]">{LINK_BUTTON_ACTIONS["Pagar Servicios"].label}</Link>
    </div>
  );
}