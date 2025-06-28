import { LINK_BUTTON_ACTIONS } from "@/constants/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ActionButtons() {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 justify-center">
      <Link href={LINK_BUTTON_ACTIONS.Tarjetas.href} className="flex items-center justify-between p-8 bg-primary-color text-secondary-color rounded-xl text-base md:text-xl font-bold min-h-[106px]">
        <p className="mt-4">{LINK_BUTTON_ACTIONS.Tarjetas.label}</p>
        <ArrowRight className="text-black mt-4"/>
      </Link>
    </div>
  );
}