import { db } from "../lib/prisma";

export const getBarbershop = async (params: { id: string }) => {
  return await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });
};
