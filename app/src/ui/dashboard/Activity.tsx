import { LINK_BUTTON_ACTIVITY } from "@/constants/constants";
import { ActivityItem } from "@/types/activity";
import { formatDayOfWeek } from "@/utils/formatDayOfWeek";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  activities: ActivityItem[];
};

//const itemsPerPage = 5;

export default function Activity({activities}:Props) {
  return (
    <div className="bg-white mt-6 rounded-lg p-4 text-sm">
      <h3 className="font-bold mb-2 text-black text-base">Tu actividad</h3>
      <ul className="space-y-3">
        {activities.map((item, i) => (
          <li key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-secondary-color w-4 h-4 bg-primary-color rounded-full" />
              <p className="text-secondary-color text-base">{item.description}</p>
            </div>
            <div className="text-right">
              <p className={item.amount < 0 ? 'text-red-500 text-base' : 'text-green-600 text-base'}>
                $ {item.amount.toFixed(2)}
              </p>
              <p className="text-secondary-color text-base">{formatDayOfWeek(item.dated)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
          <p className="text-black mt-4 text-left text-base  cursor-pointer font-bold">Ver toda tu actividad</p>
          <Link href={LINK_BUTTON_ACTIVITY.Actividad.href}>
             <ArrowRight className="text-black mt-4"/>
          </Link>
      </div>
    </div>
  );
}