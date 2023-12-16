import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../App";

// import house from "../assets/house.png";
// import dollar from "../assets/dollar.png";
// import travel from "../assets/travel.png";

import { Loan, Product } from "../types";
import DollarIcon from "./icons/Dollar";

function filterArray(loan: Loan, products: Product[]): Product {
  switch (loan) {
    case "Automobile Loan": {
      return products.filter((p) => p.name == "Automobile Loan")[0];
    }
    case "Cash Loan": {
      return products.filter((p) => p.name == "Cash Loan")[0];
    }
    case "Housing Loan": {
      return products.filter((p) => p.name == "Housing Loan")[0];
    }
  }
}

function Card() {
  const products = useContext(ProductsContext);

  const [loan, setLoan] = useState<Loan>("Housing Loan");
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>();

  useEffect(() => {
    console.log(products);

    if (products) {
      const data = filterArray(loan, products);
      setCurrentProduct(data);
    }
  }, [loan, products]);

  if (!products) {
    return <h1>THERE IS NO PRODUCTS</h1>;
  }

  return (
    <div className="text-accent rounded-md bg-white min-h-[500px] w-full md:w-auto md:px-8 border-2 py-4">
      <header className="flex justify-center items-center w-full gap-4">
        {products.map((product) => (
          <button
            className="aspect-auto w-20"
            key={product.id}
            onClick={() => setLoan(product.name)}
          >
            <img src={product.image} alt={`${product.name} Logo`} />
          </button>
        ))}
      </header>

      <div className="flex items-center justify-center flex-col gap-2 md:flex-row py-2 px-8 md:px-0 w-full">
        <div className="rounded-sm md:w-2/3 w-full md:flex-1 bg-slate-200">
          H
        </div>
        <div className="rounded-sm md:w-1/3 w-full bg-slate-200">B</div>
      </div>

      <DollarIcon />
      {JSON.stringify(currentProduct?.name)}
    </div>
  );
}

export default Card;

function LoanForm({ product }: { product: Product }) {
  <form action="">{product.name}</form>;
}
