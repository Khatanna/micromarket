import { useState } from "react";
import { Product } from "../../types";
import { CardMedia, Skeleton } from "@mui/material";

export type ProductImageProps = {
  product: Product;
  height: string | number;
  width: string | number;
};

const ProductImage: React.FC<ProductImageProps> = ({
  product: { imagenURL, nombre },
  height,
  width,
}) => {
  const [imageLoad, setImageLoad] = useState(false);
  const handleImage = () => setImageLoad(true);

  return (
    <>
      <CardMedia
        onLoad={handleImage}
        component={"img"}
        style={{ maxHeight: height }}
        width={width}
        image={imagenURL}
        title={nombre}
        hidden={!imageLoad}
        alt={nombre}
      />
      {!imageLoad && (
        <Skeleton
          height={height}
          width={width}
          variant="rectangular"
          animation="wave"
        />
      )}
    </>
  );
};

export default ProductImage;
