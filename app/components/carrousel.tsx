"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { MouseEvent, ReactNode, useRef } from "react";

interface CarrouselProps {
  children: ReactNode;
}

const Carrousel = ({ children }: CarrouselProps) => {
  const carrouselRef = useRef<HTMLDivElement | null>(null);

  const handleClickLeft = () => {
    if (!carrouselRef.current) return;
    carrouselRef.current.scrollLeft -= carrouselRef.current.offsetWidth;
  };

  const handleClickRight = () => {
    if (!carrouselRef.current) return;
    console.log(carrouselRef.current.offsetWidth);
    carrouselRef.current.scrollLeft += carrouselRef.current.offsetWidth;
  };

  return (
    <div className="relative flex justify-between items-center">
      <div
        ref={carrouselRef}
        className="w-full flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="absolute top-[40%]   w-full flex justify-between">
        <Button
          onClick={handleClickLeft}
          variant="secondary"
          className="rounded-lg"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={handleClickRight}
          variant="secondary"
          className="rounded-lg"
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default Carrousel;
