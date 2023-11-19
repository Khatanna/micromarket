import {
  Card,
  CardContent,
  Chip,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";
import Barcode from "react-barcode";
import { Product } from "../../types";
import { ProductImage } from "../ProductImage";

export type ProductDetailProps = {
  product: Product;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { categoria, codigo, descripción, nombre, precio } = product;

  return (
    <DialogContent>
      <Card sx={{ maxWidth: 550 }}>
        <CardContent className="flex flex-row gap-3">
          <div className="flex flex-col items-center">
            <ProductImage product={product} />
            <div>
              <Barcode value={codigo} width={1.4} height={50} />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex gap-2 flex-col ">
              <Typography variant="body2" color="text.secondary">
                <Chip
                  label={categoria.nombre}
                  variant="outlined"
                  color="success"
                  size="small"
                />
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {nombre}
              </Typography>

              <div className="font-semibold">{descripción}</div>
            </div>
            <div className="self-end">
              <Typography variant="h4" color="Highlight">
                {precio} Bs.
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </DialogContent>
  );
};
export default ProductDetail;
