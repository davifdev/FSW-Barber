"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/prisma";

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return [];
  }

  const startOfToday = new Date();
  return await db.booking.findMany({
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
};
