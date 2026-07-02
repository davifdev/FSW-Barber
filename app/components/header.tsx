import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Sidebar from "./sidebar-sheet";
import Link from "next/link";

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="p-5 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo FWS Barber"
            height={18}
            width={120}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
