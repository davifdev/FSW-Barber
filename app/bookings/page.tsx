import Header from "../components/header";

import BookingItem from "../components/booking-item";
import { getConfirmedBookings } from "../data/get-confirmed-bookings";
import { getConcludedBookings } from "../data/get-concluded-bookings";
import ContainerWrapper from "../components/container";

const Bookings = async () => {
  const confirmedBookings = await getConfirmedBookings();
  const concludedBookings = await getConcludedBookings();

  return (
    <>
      <Header />
      <ContainerWrapper>
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
          {concludedBookings.length > 0 ? (
            <>
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              Você não tem nenhum serviço finalizado.
            </p>
          )}
        </div>
      </ContainerWrapper>
    </>
  );
};

export default Bookings;
