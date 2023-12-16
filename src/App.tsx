import { createContext, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { Product } from "./types";
import { PRODS } from "./products";

/**
 * for validation:
 * @link https://github.com/colinhacks/zod
 * for Unstyled components:
 * @link https://www.radix-ui.com/
 * TODO: on prod use cloudinary or similar service to optimize the assets
 */

async function fetchProduct() {
  //? JUST TO TEST DEPLOYMENT WITHOUT CHANGING ALOT
  if (import.meta.env.VITE_NODE_ENV === "production") {
    return PRODS;
  }

  const res = await fetch("./product.json", {});

  // if (!res.ok) {
  //   throw new Error("Could not fetch products");
  // }

  const data = await res.json();
  return data as Product[];
}

export const ProductsContext = createContext<Product[] | undefined>(undefined);

function App() {
  const [products, setProducts] = useState<Product[] | undefined>();

  useEffect(() => {
    //TODO: handle error with try catch
    fetchProduct()
      .then((products) => {
        setProducts(products);
      })
      .catch(console.error);
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      <main className="flex min-h-screen max-w-full flex-col items-center justify-center gap-2 bg-indigo-100 bg-opacity-20 p-4 font-primary md:p-6">
        <h1 className="text-accent">
          Let's plan your <span className="font-bold">loan</span>
        </h1>
        <Card />
      </main>
    </ProductsContext.Provider>
  );
}

export default App;
