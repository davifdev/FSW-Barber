import { getServerSession } from "next-auth";
import Header from "../components/header";
import { db } from "../lib/prisma";
import { authOptions } from "../lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../components/booking-item";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return notFound();
  }

  const startOfToday = new Date();

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: startOfToday,
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const concludeBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: startOfToday,
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <>
      <Header />
      <div className="p-5 space-y-3">
        <h1 className="font-bold text-xl">Agendamentos</h1>
        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
          Confirmados
        </h2>
        {confirmedBookings.length > 0 ? (
          <>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        ) : (
          <p className="text-gray-400 text-sm">
            Você não tem nenhum serviço confirmado.
          </p>
        )}

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
          Finalizados
        </h2>
        {concludeBookings.length > 0 ? (
          <>
            {concludeBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        ) : (
          <p className="text-gray-400 text-sm">
            Você não tem nenhum serviço finalizado.
          </p>
        )}
      </div>
    </>
  );
};

export default Bookings;
