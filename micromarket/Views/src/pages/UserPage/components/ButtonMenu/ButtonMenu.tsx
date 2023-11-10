import { MoreVert, Edit, NoAccounts, PersonRemove } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useState } from 'react';

export type ButtonMenuProps = {
}

const ButtonMenu: React.FC<ButtonMenuProps> = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => setAnchorEl(null);

	return <div>
		<IconButton
			id="button"
			size='small'
			onClick={(e) => setAnchorEl(e.currentTarget)}
		>
			<MoreVert />
		</IconButton>
		<Menu id="menu" open={open} aria-labelledby='button' anchorEl={anchorEl} onClose={handleClose}>
			<MenuItem>
				<ListItemIcon>
					<Edit />
				</ListItemIcon>
				<ListItemText>
					Editar
				</ListItemText>
			</MenuItem>
			<MenuItem>
				<ListItemIcon >
					<NoAccounts />
				</ListItemIcon>
				<ListItemText>
					Deshabilitar
				</ListItemText>
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemIcon>
					<PersonRemove />
				</ListItemIcon>
				<ListItemText>
					Eliminar
				</ListItemText>
			</MenuItem>
		</Menu>
	</div>
}

export default ButtonMenu;
