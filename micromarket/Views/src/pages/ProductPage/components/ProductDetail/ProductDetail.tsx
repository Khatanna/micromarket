import {
  Card,
  CardContent,
  Chip,
  DialogContent,
  Typography,
} from "@mui/material";
import { Product } from "../../types";
import { ProductImage } from "../ProductImage";

export type ProductDetailProps = {
  product: Product;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { categoria, descripción, nombre, precio } = product;

  return (
    <DialogContent>
      <Card sx={{ maxWidth: 550 }}>
        <CardContent className="flex flex-row gap-3">
          <ProductImage product={product} height={250} />
          {/* <div className="flex flex-col items-center"></div> */}
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
