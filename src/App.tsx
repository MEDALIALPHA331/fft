import { createContext, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { Product } from "./types";

//TODO: on prod use cloudinary or similar service to optimize the assets

async function fetchProduct() {
  const res = await fetch("./product.json", {});

  if (!res.ok) {
    //TODO: handle the err, maybe return an error page
  }

  const data = await res.json();
  return data as Product[];
}

export const ProductsContext = createContext<Product[] | undefined>(undefined);

function App() {
  const [products, setProducts] = useState<Product[] | undefined>();

  useEffect(() => {
    fetchProduct()
      .then((products) => {
        setProducts(products);
      })
      .catch(console.error);
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      <main className="min-h-screen bg-indigo-100 bg-opacity-20 max-w-full flex-col flex gap-2 justify-center items-center p-4 md:p-6">
        <h1 className="text-accent">
          Let's plan your <span className="font-bold">loan</span>
        </h1>
        <Card />
      </main>
    </ProductsContext.Provider>
  );
}

export default App;
