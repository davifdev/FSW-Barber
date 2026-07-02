import Image from "next/image";
import { Barbershop } from "../generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";
interface BarbeshopItemProps {
  barbershop: Barbershop;
}

const BarbeshopItem = ({ barbershop }: BarbeshopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full ">
          <Image
            fill
            className="object-cover rounded-2xl"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>
        <div className="px-1 py-3">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className="w-full mt-3" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbeshopItem;
