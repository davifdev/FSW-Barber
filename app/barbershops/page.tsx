import BarbeshopItem from "../components/barbershop-item";
import ContainerWrapper from "../components/container";
import Header from "../components/header";
import Search from "../components/search";
import { getBarbershops } from "../data/get-barbershops";
interface BarbershopsPageProps {
  searchParams: {
    title?: string;
    service?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await getBarbershops({ searchParams });

  return (
    <div>
      <Header />
      <ContainerWrapper>
        <div className="p-5">
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
      </ContainerWrapper>
    </div>
  );
};

export default BarbershopsPage;
