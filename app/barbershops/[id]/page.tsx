import PhoneItem from "@/app/components/phone-item";
import ServiceItem from "@/app/components/service-item";
import Sidebar from "@/app/components/sidebar-sheet";
import { Button } from "@/app/components/ui/button";
import { SheetTrigger, Sheet } from "@/app/components/ui/sheet";
import { db } from "@/app/lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Image
          fill
          className="object-cover"
          src={barbershop.imageUrl}
          alt={barbershop.name}
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </div>

      <div className="p-5 border-b border-solid space-y-3">
        <h1 className="text-xl font-bold ">{barbershop.name}</h1>
        <div className="flex items-center gap-2 ">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="p-5 border-b border-solid space-y-3">
        <h2 className="font-bold uppercase text-gray-400 text-xs">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop.description}</p>
      </div>

      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="font-bold uppercase text-gray-400 text-xs">Serviços</h2>
        {barbershop.services.map((service) => (
          <ServiceItem
            service={service}
            barbershop={barbershop}
            key={service.id}
          />
        ))}
      </div>

      <div className="p-5 space-y-3">
        {barbershop.phones.map((phone) => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
