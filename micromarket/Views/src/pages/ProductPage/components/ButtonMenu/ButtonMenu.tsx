import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { Product } from "../../types";
import { useProductContext } from "../../hooks/useProductContext";
export type ButtonMenuProps = {
  product: Product;
};

const ButtonMenu: React.FC<ButtonMenuProps> = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const { showFormProduct } = useProductContext();
  const { axios } = useAxiosStore();
  const { mutate } = useMutation<
    Product,
    unknown,
    Product,
    { optimisticData: Product[] | undefined }
  >({
    mutationFn: async ({ id }: Product) => {
      return (await axios.delete<Product>(`/products/${id}`)).data;
    },
    onMutate({ id }) {
      const previousData = queryClient.getQueryData<Product[]>([
        "getAllProducts",
      ]);
      queryClient.setQueryData(
        ["getAllProducts"],
        previousData?.filter((p) => p.id !== id),
      );

      return { optimisticData: previousData };
    },
    onSuccess({ nombre }) {
      toast.success(`Producto: (${nombre}) eliminado`);
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },
    onError(error, { nombre }, context) {
      toast.error(`No se pudo eliminar el producto: ${nombre}`);
      if (context?.optimisticData) {
        queryClient.setQueryData(["getAllUsers"], context.optimisticData);
      }
    },
  });
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    mutate(product);
  };

  return (
    <>
      <IconButton
        id="button"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="menu"
        open={open}
        aria-labelledby="button"
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            showFormProduct(product);
          }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ButtonMenu;
