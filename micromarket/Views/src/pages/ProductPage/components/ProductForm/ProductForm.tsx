import {
  Autocomplete,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../../../types";
import { useAxiosStore } from "../../../../state/useAxiosStore";

export type ProductFormProps = {
  onClose: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ onClose }) => {
  const { register } = useForm<Product>();
  const { axios } = useAxiosStore();
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      return (await axios.get("/categories")).data;
    },
  });
  return (
    <form>
      <Stack spacing={3} width={300}>
        <Stack spacing={2}>
          <TextField
            {...register("nombre")}
            label="Nombre"
            variant="standard"
          />
          <TextField
            {...register("descripción")}
            label="Descripción del producto"
            variant="standard"
            multiline
            maxRows={4}
          />
          {isLoading ? (
            <div className="flex justify-center border p-2 rounded">
              <CircularProgress size={28} />
            </div>
          ) : (
            <Autocomplete
              className="w-100"
              {...register("categoria.nombre")}
              options={
                data?.map((c) => ({ label: c.nombre, value: c.id })) ?? []
              }
              renderInput={(params) => (
                <TextField {...params} label="Categoria" variant="standard" />
              )}
            />
          )}
          <TextField
            {...register("precio", { valueAsNumber: true })}
            label="Precio"
            variant="standard"
            type="number"
          />
        </Stack>
        <Button type="submit" variant="contained" color="success">
          Crear
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
