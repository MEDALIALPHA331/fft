import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

export interface Product {
  id: string;
  interest: number;
  name: string;
  min_amount: number;
  max_amount: number;
  min_tenure: number;
  max_tenure: number;
  image: string;
}

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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Card />
    </ProductsContext.Provider>
  );
}

export default App;
