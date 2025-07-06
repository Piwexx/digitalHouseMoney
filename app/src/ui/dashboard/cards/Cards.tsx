import { Card } from "@/types/card";
import CardItem from "./CardItem";
import Panel from "../../common/layout/Panel";
import PageTitle from "../../common/layout/PageTitle"; // Import PageTitle

interface Props {
  cards: Card[];
  accountId: number; // Still needed by CardItem if CardItem isn't using context for this yet
  token: string;     // Still needed by CardItem if CardItem isn't using context for this yet
}


export default function Cards({ cards, accountId, token }: Props) {

  return (
    // Using Panel component. mt-6 and min-h-[300px] are specific layout/sizing, pass via className.
    // text-sm was on the original div, Panel children will inherit or set their own.
    <Panel
      className="mt-6 min-h-[300px] text-sm"
      padding="md" // Corresponds to p-4
      rounded="lg"
      shadow="md" // Assuming default shadow is desired
      // variant="default" // Default is white bg, text-black
    >
      <PageTitle as="h3" className="mb-2 text-base">
        {/* Original was h3, text-base, mb-2. PageTitle defaults font-bold and text-black */}
        Tus Tarjetas
      </PageTitle>
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