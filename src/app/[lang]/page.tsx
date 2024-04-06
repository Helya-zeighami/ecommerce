import getProducts from "@/lib/getProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductsHome from "./products/page";

type Params = {
  params: {
    lang: string;
  };
};

const Home = async ({ params: { lang } }: Params) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ProductsHome params={{ lang }} />
      </div>
    </HydrationBoundary>
  );
};

export default Home;
