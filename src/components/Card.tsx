import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../App";

// import house from "../assets/house.png";
// import dollar from "../assets/dollar.png";
// import travel from "../assets/travel.png";

import { Product } from "../types";

type Loan = "House" | "Automobile" | "Cash";

function filterArray(loan: Loan, products: Product[]): Product {
  switch (loan) {
    case "Automobile": {
      return products.filter((p) => p.name == "Automobile Loan")[0];
    }
    case "Cash": {
      return products.filter((p) => p.name == "Cash Loan")[0];
    }
    case "House": {
      return products.filter((p) => p.name == "Housing Loan")[0];
    }
  }
}

function Card() {
  const products = useContext(ProductsContext);

  const [loan, setLoan] = useState<Loan>("Automobile");
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>();

  useEffect(() => {
    console.log(products);

    if (products) {
      const data = filterArray(loan, products);
      setCurrentProduct(data);
    }
  }, [loan, products]);

  if (!products) {
    return <div>TODO: empty sate</div>;
  }

  return (
    <div className="text-accent w-2/3 border-2 border-accent">
      <header className="flex justify-center items-center w-full px-4">
        {/* <button onClick={() => setLoan("Automobile")}>
          <img src={travel} alt="car logo" />
        </button>

        <button onClick={() => setLoan("House")}>
          <img src={house} alt="" />
        </button>

        <button onClick={() => setLoan("Cash")}>
          <img src={dollar} alt="" />
        </button> */}

        {products.map((product) => (
          <button
            className="aspect-auto w-20"
            key={product.id}
            onClick={() => setLoan("Cash")}
          >
            <img src={product.image} alt={`${product.name} Logo`} />
          </button>
        ))}
      </header>

      {JSON.stringify(currentProduct?.name)}
    </div>
  );
}

export default Card;

function LoanForm({ product }: { product: Product }) {
  <form action="">{product.name}</form>;
}
