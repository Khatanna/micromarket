import { Delete, Edit, List, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Store } from "../../types";

export type ButtonMenuProps = {
  store: Store;
};

const ButtonMenu: React.FC<ButtonMenuProps> = ({ store }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
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
            // showFormProduct(product);
          }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <List />
          </ListItemIcon>
          <ListItemText>Disponer</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ButtonMenu;
