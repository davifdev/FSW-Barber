"use client";

import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Prisma } from "../generated/prisma/client";
import { isFuture, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { deleteBooking } from "../actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    service: { barbershop },
  } = booking;
  const isConfirmed = isFuture(booking.date);

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      handleSheetOpenChange(false);
      toast.success(
        `Reserva ${isConfirmed ? "cancelada" : "excluída"} com sucesso!`,
      );
    } catch (error) {
      console.error(error);
      toast.error(
        `Erro ao ${isConfirmed ? "cancelar" : "excluir"} reserva. Tente novamente mais tarde.`,
      );
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0 ">
            <div className="flex flex-col gap-2 py-5 pl-5 items-start">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "destructive"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex gap-2 items-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] w-full flex items-end mt-6">
          <Image
            fill
            src="/barber-shop-card.png"
            className="object-cover rounded-xl"
            alt={`Mapa da barbearia ${barbershop.name}`}
          />

          <Card className="z-10 w-full mb-3 mx-5 rounded-xl">
            <CardContent className="px-5 py-3 flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs text-gray-400">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit text-primary border border-primary"
            variant={isConfirmed ? "outline" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3 mb-6">
            <CardContent className="p-3 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm text-gray-400">
                  {format(booking.date, "d, 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm text-gray-400">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm text-gray-400">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem phone={phone} key={index} />
            ))}
          </div>
        </div>
        <SheetFooter>
          <div className="flex items-center gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-[50%]" variant="outline">
                Voltar
              </Button>
            </SheetClose>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[50%]" variant="destructive">
                  {isConfirmed ? "Cancelar Reserva" : "Excluir Reserva"}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-xl">
                <DialogHeader>
                  <DialogHeader>
                    Você deseja cancelar esta reserva?
                  </DialogHeader>
                  <DialogDescription>
                    Esta ação não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex items-center gap-3">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-[50%]">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        className="w-[50%]"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
