import React, { useEffect } from 'react';
import { useProductStore } from '../../state/useProductStore';
import { Card, CardContent, CardMedia, Chip, DialogContent, Typography } from '@mui/material';
import Barcode from 'react-barcode';

export type ProductDetailProps = {
	onClose: () => void 
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onClose }) => {
	const product = useProductStore(s => s.product!);
	const setProduct = useProductStore(s => s.setProduct);
	useEffect(() => {
		return () => {
			setProduct(undefined);
		}
	}, [])
	return <DialogContent>
	  <Card sx={{ maxWidth: 550 }}>
		<CardContent className="flex flex-row gap-3">
		  <div className="flex flex-col items-center">
			<CardMedia
			  component={"img"}
			  style={{ maxHeight: '250px'}}
			  image={product.imagenURL}
			  title={product.nombre}
			/>
			<div>
				<Barcode value={product.codigo} width={1.4} height={50} />
			</div>
		  </div>
		  <div className="flex flex-col justify-between">
			<div className="flex gap-2 flex-col ">
			  <Typography variant="body2" color="text.secondary">
				<Chip
				  label={product.categoria.nombre}
				  variant="outlined"
				  color="success"
				  size="small"
				/>
			  </Typography>
			  <Typography gutterBottom variant="h5" component="div">
				{product.nombre}
			  </Typography>
  
			  <div className="font-semibold">{product.descripción}</div>
			</div>
			<div className="self-end">
			  <Typography variant="h4" color="Highlight">
				{product.precio} Bs.
			  </Typography>
			</div>
		  </div>
		</CardContent>
	  </Card >
	</DialogContent >
  };

export default ProductDetail;
