import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { cloneElement, createContext, useState } from "react";
import { ProductDetail } from "../components/ProductDetail";
import { Product } from "../types";
import { ProductForm } from "../components/ProductForm";

interface State {}

interface Actions {
  // clearProduct: () => void;
  showFormProduct: (product?: Product) => void;
  showProduct: (product: Product) => void;
}

const initialState = {};

export const ProductContext = createContext<State & Actions>({
  showFormProduct(product) {},
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

  const showFormProduct = (product?: Product) => {
    setModal({
      title: product ? "Actualizar producto" : "Crear producto",
      open: true,
      content: cloneElement(
        <ProductForm
          product={product}
          onClose={() => {
            setModal({
              open: false,
              title: undefined,
              content: undefined,
            });
          }}
        />,
      ),
    });
  };

  return (
    <ProductContext.Provider value={{ showProduct, showFormProduct }}>
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
