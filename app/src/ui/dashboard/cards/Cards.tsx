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
      <h3 className="font-bold mb-2 text-black text-base">Tus Tarjetas</h3>
      {/* Changed title to "Tus Tarjetas" as it seems more appropriate */}
      <ul className="space-y-3">
        {cards.length === 0 && (
          <p className="text-gray-500 text-center py-4">No tienes tarjetas agregadas.</p>
        )}
        {cards.map((card) => (
          // Use card.id as key for stable identity
          <CardItem key={card.id} card={card} token={token} accountId={accountId} />
        ))}
      </ul>
    </div>
  );
}