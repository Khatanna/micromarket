import { ProductList } from "./components/ProductList";
import { ProductProvider } from "./context/ProductContext";

const ProductPage = () => {
  return (
    <div>
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </div>
  );
};

export default ProductPage;
