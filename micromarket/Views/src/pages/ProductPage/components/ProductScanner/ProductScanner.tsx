import { Alert, TextField } from '@mui/material';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAxiosStore } from '../../../../state/useAxiosStore';
import { Product } from '../../types';

export type ProductScannerProps = {
}

const ProductScanner: React.FC<ProductScannerProps> = ({ }) => {
	const queryClient = useQueryClient(); 
	const [code, setCode] = useState('');
	const { axios } = useAxiosStore();
	const { data, isLoading, error } = useQuery<Product>({
		queryKey: ["getProductByCode"],
		queryFn: async ({ queryKey }) => {
			return (await axios.get(`products/${queryKey.at(-1)}`)).data
		},
		enabled: false,
	})

	const handleValidationCode = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		if (value.match(/^DNT-\d{2}-\d{4}$/i)) {
			// queryClient.({queryKey: ['getProductByCode', value] });
			// setCode("");
		}
		setCode(value);
	}

	return <div className='mt-2'>
		{isLoading ? (
			<div>Buscando producto...</div>
		) : <TextField
			label="Codigo de producto"
			placeholder='Scanee el codigo'
			onChange={handleValidationCode}
			className='w-full'
			value={code}
			autoFocus
		/>}
		{JSON.stringify(data)}
		{error && <Alert className='mt-1' severity='error' variant='outlined' >No se ha encontrado este producto</Alert>}
	</div>;
};

export default ProductScanner;
