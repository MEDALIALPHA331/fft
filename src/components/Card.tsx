import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../App";

import { Loan, Product } from "../types";
import DollarIcon from "./icons/Dollar";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import ProductsLoader from "./Loader";

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

  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [months, setMonths] = useState<number>(1);

  useEffect(() => {
    // console.log(products);

    if (products) {
      const data = filterArray(loan, products);
      setCurrentProduct(data);
    }
  }, [loan, products]);

  if (!products) {
    return (
      <div className="grid min-h-[500px] w-full place-content-center md:w-[550px]">
        <ProductsLoader />
      </div>
    );
  }

  return (
    <div className="min-h-[500px] w-full rounded-md border-2 bg-white py-4 text-slate-600 md:w-[550px] md:px-8">
      <header className="flex w-full items-center justify-center gap-4 py-2">
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

      <section className="container flex w-full flex-col items-center justify-center gap-4 px-5 py-2 md:px-0 ">
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <div className="flex w-full flex-col md:w-2/3 md:flex-1">
            <label
              className="text-sm text-slate-500"
              htmlFor={`${currentProduct?.name}-loan`}
            >
              {currentProduct?.name} amount
            </label>

            <div className="flex w-full rounded-md border-2 border-slate-200 pl-2">
              <DollarIcon color="fill-slate-200" />

              <input
                className=" w-full p-2 focus:outline-none"
                type="number"
                value={loanAmount}
                onChange={(e) =>
                  setLoanAmount((prev) =>
                    prev >= 0 ? parseInt(e.target.value) : 0,
                  )
                }
                name={`${currentProduct?.name}-loan`}
                id={`${currentProduct?.name}-loan`}
              />
            </div>
          </div>

          <div className="flex w-full flex-col md:w-1/3">
            <label
              className="rounded-md text-sm text-slate-500"
              htmlFor={`${currentProduct?.name}-months`}
            >
              Number of months
            </label>

            <div className="flex w-full items-center justify-between rounded-md border-2 border-slate-200 px-1">
              <button
                onClick={() =>
                  setMonths((prev) => (prev > 1 ? (prev -= 1) : 1))
                }
              >
                <ArrowLeft size={24} />
              </button>
              <input
                className="w-full p-2 text-center focus:outline-none"
                type="number"
                max={12}
                min={1}
                value={months}
                // onKeyDown={() =>
                //   setMonths((prev) => (prev > 1 ? (prev -= 1) : 1))
                // }
                readOnly
                onChange={(e) => setMonths(Number(e.target.value))}
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

        <div className="my-2 flex min-h-[150px] w-full flex-col items-center justify-center rounded-md border-2 border-slate-200">
          <div className="flex h-1/2 w-full items-center justify-between px-6 py-8 md:px-12">
            <h1 className="text-lg text-slate-800 md:text-xl">
              Monthly amount
            </h1>
            <span className="text-2xl font-bold text-accent">${552}</span>
          </div>

          <div className="h-1/2 w-full bg-indigo-100 bg-opacity-30 px-8 py-6 text-center text-xs font-normal md:text-left">
            You’re planning {months}{" "}
            <strong className="font-bold">monthly deposits</strong> to reach
            your <span className="font-bold">${loanAmount}</span> goal by{" "}
            <span className="font-bold">July 2023</span>. The total amount
            loaned will be <span className="font-bold">${`26, 300`}</span>
          </div>
        </div>
      </section>

      <div className="flex w-full py-2">
        <button className="mx-auto w-3/4 rounded-3xl border-2 border-transparent bg-blue-800 py-3 text-white transition-all duration-500 ease-in-out hover:border-2 hover:border-blue-800 hover:bg-white hover:text-blue-800">
          Apply now
        </button>
      </div>
    </div>
  );
}

export default Card;
