import { Card } from "@/types/card";
import CardItem from "./CardItem";

interface Props {
  cards: Card[]
  accountId:number
  token:string
}


export default function Cards({cards,accountId,token}:Props) {

  return (
    <div className="bg-white mt-6 rounded-lg p-4 text-sm min-h-[300px]">
      <h3 className="font-bold mb-2 text-black text-base">Tu actividad</h3>
      <ul className="space-y-3">
        {cards.map((card,i) => (
          <CardItem key={i} card={card} token={token} accountId={accountId}/>
        ))}
      </ul>
    </div>
  );
}