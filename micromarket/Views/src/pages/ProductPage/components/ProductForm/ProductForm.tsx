import { CheckCircle, CloudUpload } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { storage } from "../../../../services/firebaseStore";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { Category } from "../../../CategoryPage/types";
import { Product } from "../../types";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type ProductFormProps = {
  product?: Product;
  onClose: () => void;
};

const CategorySelect: React.FC<{ category: Category }> = ({ category }) => {
  if (!category.categorias || category.categorias.length === 0) {
    return <option value={category.id}>{category.nombre}</option>;
  }

  return (
    <optgroup label={category.nombre}>
      {category.categorias.map((c) => (
        <CategorySelect category={c} />
      ))}
    </optgroup>
  );
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<Product>({
    defaultValues: product,
  });
  const { axios } = useAxiosStore();
  const { data, isLoading } = useQuery<Category[]>({
    queryKey: ["getAllCategories"],
    queryFn: async () => {
      return (await axios.get("/categories")).data;
    },
  });
  const { mutate: create } = useMutation<
    Product,
    AxiosError,
    Product,
    { optimisticData: Product[] }
  >({
    mutationFn: async (data) => {
      return (await axios.post("/products", data)).data;
    },
    onSuccess({ nombre }) {
      toast.success(`Producto (${nombre}) creado`);
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      onClose();
    },
    onError(error, { nombre }, context) {
      console.log(error);
      toast.error(`No se pudo crear el producto: (${nombre})`);
      if (context?.optimisticData) {
        queryClient.setQueryData(["getAllProducts"], context.optimisticData);
      }
    },
  });

  const { mutate: update, mutateAsync } = useMutation<
    Product,
    AxiosError,
    Product,
    { optimisticData: Product[] }
  >({
    mutationFn: async (data) => {
      return (
        await axios.put(`/products/${data.id}`, {
          ...data,
          categoria: undefined,
        })
      ).data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      onClose();
    },
    onError(_error, _nombre, context) {
      if (context?.optimisticData) {
        queryClient.setQueryData(["getAllProducts"], context.optimisticData);
      }
    },
  });
  const [isUpload, setIsUpload] = useState(false);
  const submit = async (data: Product) => {
    const image = data.imagen[0];
    if (product) {
      if (image) {
        const imageRef = ref(storage, image.name);
        const uploadFile = uploadBytes(imageRef, image);

        toast.promise(uploadFile, {
          loading: "Subiendo imagen",
          success: (uploadResult) => {
            toast.promise(getDownloadURL(uploadResult.ref), {
              loading: "Obteniendo direccion",
              success: (imagenURL) => {
                update({
                  ...data,
                  imagenURL,
                });

                return "Se obtuvo la direccion";
              },
            });

            return "Image subida correctamente";
          },
        });
      } else {
        toast.promise(mutateAsync({ ...product, ...data }), {
          loading: `Actualizando: ${data.nombre}`,
          success: (data) => {
            return `Producto (${data.nombre}) actualizado`;
          },
          error: (error) => {
            console.log(error);
            return `No se pudo actualizar el producto: (${data.nombre})`;
          },
        });
      }
    } else {
      const imageRef = ref(storage, image.name);
      const uploadFile = uploadBytes(imageRef, image);

      toast.promise(uploadFile, {
        loading: "Subiendo imagen",
        success: (uploadResult) => {
          toast.promise(getDownloadURL(uploadResult.ref), {
            loading: "Obteniendo direccion",
            success: (imagenURL) => {
              create({
                ...data,
                imagenURL,
              });

              return "Se obtuvo la direccion";
            },
          });

          return "Image subida correctamente";
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3} width={300}>
        <Stack spacing={3}>
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
          <TextField
            {...register("precio")}
            label="Precio"
            variant="standard"
            type="text"
          />
          {isLoading ? (
            <div className="flex justify-center border p-2 rounded">
              <CircularProgress size={28} />
            </div>
          ) : (
            <FormControl size="small">
              <InputLabel variant="outlined">Categoria</InputLabel>
              <Select
                variant="outlined"
                label="Categoria"
                native
                {...register("categoriaId")}
              >
                <option aria-label="None" value=""></option>
                {data?.map((category) => (
                  <CategorySelect category={category} />
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            component="label"
            variant={!isUpload ? "contained" : "outlined"}
            color="warning"
            onChange={(e) => setIsUpload(e.target.files.length === 1)}
            startIcon={isUpload ? <CheckCircle /> : <CloudUpload />}
          >
            {isUpload
              ? "Imagen subida"
              : product
              ? "Reemplazar imagen"
              : "Subir imagen"}
            <VisuallyHiddenInput type="file" {...register("imagen")} />
          </Button>
        </Stack>
        <Button type="submit" variant="contained" color="success">
          {product ? "Actualizar" : "Crear"}
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
