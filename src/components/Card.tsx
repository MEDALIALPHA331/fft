import { useContext } from "react";
import { ProductsContext } from "../App";

function Card() {
  const products = useContext(ProductsContext);

  if (!products) {
    return <div>empty</div>;
  }

  return <div>some: {JSON.stringify(products)}</div>;
}

export default Card;
