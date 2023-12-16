import { Fragment, useContext, useEffect, useId, useState } from "react";
import { ProductsContext } from "../App";

// import house from "../assets/house.png";
// import dollar from "../assets/dollar.png";
// import travel from "../assets/travel.png";

import { Loan, Product } from "../types";
import DollarIcon from "./icons/Dollar";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";

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

  const [loanAmount, setLoanAmount] = useState<number>();
  const [months, setMonths] = useState<number>(1);

  useEffect(() => {
    console.log(products);

    if (products) {
      const data = filterArray(loan, products);
      setCurrentProduct(data);
    }
  }, [loan, products]);

  if (!products) {
    return <h1>Loading PRODUCTS</h1>;
  }

  return (
    <div className="text-slate-600 rounded-md bg-white min-h-[500px] w-full md:w-[550px] md:px-8 border-2 py-4">
      <header className="flex justify-center items-center w-full gap-4">
        {products.map((product) => (
          <>
            <button
              className="aspect-auto w-20"
              key={product.id}
              onClick={() => setLoan(product.name)}
            >
              <img src={product.image} alt={`${product.name} Logo`} />
            </button>
          </>
        ))}
      </header>

      <section className="container py-4 gap-4 px-8 md:px-0 w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center flex-col gap-2 md:flex-row w-full">
          <div className="md:w-2/3 w-full md:flex-1 flex flex-col">
            <label
              className="text-sm text-slate-500"
              htmlFor={`${currentProduct?.name}`}
            >
              {currentProduct?.name} amount
            </label>

            <div className="w-full flex rounded-md border-2 border-slate-200 pl-2">
              <DollarIcon color="fill-slate-200" />

              <input
                className=" focus:outline-none p-2 w-full"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                name={`${currentProduct?.name}-loan`}
                id={`${currentProduct?.name}-loan`}
              />
            </div>
          </div>

          <div className="md:w-1/3 w-full flex flex-col">
            <label
              className="rounded-md text-sm text-slate-500"
              htmlFor={`${currentProduct?.name}`}
            >
              Number of months
            </label>

            <div className="w-full flex justify-between items-center border-2 border-slate-200 rounded-md px-1">
              <button
                onClick={() =>
                  setMonths((prev) => (prev > 1 ? (prev -= 1) : 1))
                }
              >
                <ArrowLeft size={24} />
              </button>
              <input
                className="p-2 focus:outline-none text-center w-full"
                type="number"
                max={12}
                min={1}
                value={months}
                // onChange={(e) => setMonths(parseInt(e.target.value))}
                name={`${currentProduct?.name}-months`}
                id={`${currentProduct?.name}-months`}
              />

              <button
                onClick={() =>
                  setMonths((prev) => (prev < 12 ? (prev += 1) : 12))
                }
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full"></div>
      </section>

      {/* <DollarIcon /> */}
      {JSON.stringify(currentProduct?.name)}
    </div>
  );
}

export default Card;

function LoanForm({ product }: { product: Product }) {
  <form action="">{product.name}</form>;
}
