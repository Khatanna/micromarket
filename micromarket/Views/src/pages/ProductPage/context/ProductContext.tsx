import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { cloneElement, createContext, useState } from "react";
import { ProductDetail } from "../components/ProductDetail";
import { Product } from "../types";

interface State {}

interface Actions {
  // clearProduct: () => void;
  showProduct: (product: Product) => void;
}

const initialState = {};

export const ProductContext = createContext<State & Actions>({
  // ...initialState,
  // clearProduct() {},
  showProduct() {},
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [product, setProduct] = useState<Product>(initialState.product);
  // const clearProduct = () => {
  //   setProduct(initialState.product);
  // };
  const [{ open, content, title }, setModal] = useState<{
    open: boolean;
    title?: string;
    content?: React.ReactNode;
  }>({
    open: false,
  });

  const showProduct = (product: Product) => {
    setModal({
      title: "Detalle del producto",
      open: true,
      content: cloneElement(<ProductDetail product={product} />),
    });
  };
  return (
    <ProductContext.Provider value={{ showProduct }}>
      {open && content && (
        <Dialog
          open={open}
          onClose={() =>
            setModal({ open: false, title: undefined, content: undefined })
          }
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{content}</DialogContent>
        </Dialog>
      )}
      {children}
    </ProductContext.Provider>
  );
};
