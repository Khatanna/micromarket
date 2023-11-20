import { useState } from "react";
import { Product } from "../../types";
import { CardMedia, Skeleton } from "@mui/material";

export type ProductImageProps = {
  product: Product;
  height: string | number;
  // width: string | number;
};

const ProductImage: React.FC<ProductImageProps> = ({
  product: { imagenURL, nombre },
  height,
}) => {
  const [imageLoad, setImageLoad] = useState(false);
  const handleImage = () => setImageLoad(true);

  return (
    <div className="w-100">
      <CardMedia
        onLoad={handleImage}
        component={"img"}
        style={{ maxHeight: height }}
        image={imagenURL}
        title={nombre}
        hidden={!imageLoad}
        alt={nombre}
        className="w-100"
      />
      {!imageLoad && (
        <Skeleton
          className="w-100"
          height={height}
          width={180}
          variant="rectangular"
          animation="wave"
        />
      )}
    </div>
  );
};

export default ProductImage;
