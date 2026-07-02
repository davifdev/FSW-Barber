"use client";

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { quickSearchOptions } from "../constants/search";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const Sidebar = () => {
  const { data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 py-5 border-b justify-between border-solid">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font bold">Olá, faça seu login</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]  rounded-xl">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 py-5 border-b border-solid">
        <SheetClose asChild>
          <Button className="justify-start gap-2" size="lg" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button
          className="justify-start gap-2"
          variant="ghost"
          size="lg"
          asChild
        >
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 py-5 border-b border-solid">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button
              className="justify-start gap-2"
              variant="ghost"
              size="lg"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  height={18}
                  width={18}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            className="justify-start"
            variant="ghost"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  );
};

export default Sidebar;
