import { MoreVert, Edit, NoAccounts, PersonRemove } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export type ButtonMenuProps = {
  user: Usuario;
};

const ButtonMenu: React.FC<ButtonMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const { axios } = useAxiosStore();
  const { mutate } = useMutation<
    Usuario,
    unknown,
    string,
    { optimisticData: Usuario[] | undefined }
  >({
    mutationFn: async (id: string) => {
      return (await axios.delete<Usuario>(`/users/${id}`)).data;
    },
    onMutate(nombre_de_usuario) {
      const previousData = queryClient.getQueryData<Usuario[]>(["getAllUsers"]);
      queryClient.setQueryData(
        ["getAllUsers"],
        previousData?.filter((u) => u.nombre_de_usuario !== nombre_de_usuario),
      );

      return { optimisticData: previousData };
    },
    onSuccess({ nombres }) {
      toast.success(`Usuario: (${nombres}) eliminado`);
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
    onError(error, nombre_de_usuario, context) {
      toast.error(`No se pudo eliminar el usuario: ${nombre_de_usuario}`);
      if (context?.optimisticData) {
        queryClient.setQueryData(["getAllUsers"], context.optimisticData);
      }
    },
  });
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    mutate(user.nombre_de_usuario);
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
        <MenuItem>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NoAccounts />
          </ListItemIcon>
          <ListItemText>Deshabilitar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <PersonRemove />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ButtonMenu;
