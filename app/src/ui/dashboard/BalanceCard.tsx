import { LINK_BUTTON_BALANCED } from "@/constants/constants";
import { formatAmount } from "@/utils/formatAmount";
import Link from "next/link";


export default function BalanceCard({ amount }: { amount: number }) {
  return (
    <div className="bg-secondary-color text-white rounded-lg p-8 flex flex-col justify-between">
      <div className="text-base space-x-3 text-right">
        <Link href={LINK_BUTTON_BALANCED.Tarjetas.href}>
          <span className="underline cursor-pointer">{LINK_BUTTON_BALANCED.Tarjetas.label}</span>
        </Link>
        <Link href={LINK_BUTTON_BALANCED["Tu perfil"].href}>
          <span className="underline cursor-pointer">{LINK_BUTTON_BALANCED["Tu perfil"].label}</span>
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-base text-white">Dinero disponible</p>
        <p className="text-2xl md:text-4xl font-bold text-white border-primary-color border-1 rounded-4xl p-2 mt-2 inline-block">{formatAmount(amount)}</p>
      </div>
    </div>
  );
}