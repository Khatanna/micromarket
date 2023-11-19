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
import { useProductStore } from "../../state/useProductStore";
// import { content } from "../ProductList/ProductList";
export type ButtonMenuProps = {
  product: Product;
};

const ButtonMenu: React.FC<ButtonMenuProps> = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setProduct, setModal } = useProductStore();
  const queryClient = useQueryClient();
  const { axios } = useAxiosStore();
  const { mutate } = useMutation<
    Product,
    unknown,
    Product,
    { optimisticData: Product[] | undefined }
  >({
    mutationFn: async ({ codigo }: Product) => {
      return (await axios.delete<Product>(`/products/${codigo}`)).data;
    },
    onMutate({ codigo }) {
      const previousData = queryClient.getQueryData<Product[]>([
        "getAllProducts",
      ]);
      queryClient.setQueryData(
        ["getAllProducts"],
        previousData?.filter((p) => p.codigo !== codigo),
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
    <div>
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
            setProduct(product);
            // setModal({title: "Actualizar producto", open: true , content: content["modalCreate"]})
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
    </div>
  );
};

export default ButtonMenu;
