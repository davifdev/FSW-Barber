import BarbeshopItem from "../components/barbershop-item";
import Header from "../components/header";
import Search from "../components/search";
import { db } from "../lib/prisma";
interface BarbershopsPageProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <div>
      <Header />
      <div className="px-5">
        <div className="mt-6">
          <Search />
        </div>
        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-3">
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbeshopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
