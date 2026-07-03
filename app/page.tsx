import Header from "./components/header";
import { Button } from "./components/ui/button";
import Image from "next/image";
import { db } from "./lib/prisma";
import BarbershopItem from "./components/barbershop-item";
import { quickSearchOptions } from "./constants/search";
import BookingItem from "./components/booking-item";
import Search from "./components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getConfirmedBookings } from "./data/get-confirmed-bookings";
import ContainerWrapper from "./components/container";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Carrousel from "./components/carrousel";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const bookings = session?.user ? await getConfirmedBookings() : [];

  return (
    <div>
      <Header />
      <ContainerWrapper>
        <div className="p-5">
          <h2 className="text-xl font-bold">
            Olá, {session?.user?.name || "Visitante"}
          </h2>

          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, d", { locale: ptBR })}
            </span>{" "}
            <span>de</span>
            <span className="capitalize">
              {" "}
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>

          <div className="mt-6">
            <Search />
          </div>

          <div className="flex gap-3 mt-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {quickSearchOptions.map((option) => (
              <Button variant="secondary" size="lg" key={option.title} asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>

          <div className="relative w-full h-[150px] lg:h-[300px] mt-6">
            <Image
              src="/banner-01.png"
              alt="Agende nos melhores com FSW Barber"
              fill
              className="object-fill aspect-auto rounded-xl rendering-crisp shape-crisp"
            />
          </div>

          {/* Agendamento */}
          <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
            Agendamentos
          </h2>

          {bookings.length > 0 ? (
            <>
              {" "}
              <Carrousel>
                {bookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                ))}
              </Carrousel>
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              Você não tem nenhum serviço agendado.
            </p>
          )}

          {/* Barbearias */}
          <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
            Recomendados
          </h2>
          <Carrousel>
            {barbershops.map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </Carrousel>

          {/* Populares */}
          <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
            Populares
          </h2>
          <Carrousel>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </Carrousel>
        </div>
      </ContainerWrapper>
    </div>
  );
}
