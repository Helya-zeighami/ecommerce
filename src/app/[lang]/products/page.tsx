import React from "react";
import Products from "./Products";

type Params = {
  params: {
    lang: string;
  };
};
const ProductsHome = ({ params: { lang } }: Params) => {
  return (
    <div>
      <Products params={{ lang }} />
    </div>
  );
};

export default ProductsHome;
