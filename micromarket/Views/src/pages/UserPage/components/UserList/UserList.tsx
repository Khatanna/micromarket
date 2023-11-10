import { PersonAdd, Warning } from '@mui/icons-material';
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, Modal, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Table from 'react-data-table-component';
import { useState } from 'react';
import { Alignment, TableColumn } from 'react-data-table-component';
import { ButtonMenu } from '../ButtonMenu';
export type UserListProps = {
}

const columns: TableColumn<Usuario>[] = [
	{
		name: 'Usuario',
		selector: ({ nombres, apellido_paterno, apellido_materno }) => `${nombres} ${apellido_paterno} ${apellido_materno}`
	},
	{
		name: 'Nombre de usuario',
		selector: row => row.nombre_de_usuario
	},
	{
		name: 'Estado',
		selector: row => row.estado === 'ENABLE' ? 'Habilitado' : 'Deshabilitado'
	},
	{
		name: 'Roles',
		selector: row => row.roles.map(r => r.nombre).join(' - ')
	},
	{
		cell: row => <ButtonMenu />,
		center: true,
		grow: 1
	}
]

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})


const UserList: React.FC<UserListProps> = ({ }) => {
	const [open, setOpen] = useState(false);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['getAllUsers'],
		queryFn: async () => {
			return (await instance.get('/users')).data
		}
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Typography variant="h3" component={'h1'}>Micromarket doña Natty</Typography>
			<Table
				customStyles={{
					noData: {
						style: {
							height: '50vh',
						}
					},
					progress: {
						style: {
							height: '50vh'
						}
					}
				}}
				columns={columns}
				data={data}
				actions={
					<div>
						<Button variant='outlined' color='success' startIcon={<PersonAdd />} onClick={handleOpen}>
							Añadir usuario
						</Button>
						<Dialog
							open={open}
							onClose={handleClose}
						>
							<DialogTitle>
								Crear usuario
							</DialogTitle>
							<DialogContent>
								<FormLabel>
									Nombres
								</FormLabel>
								<FormControl placeholder='Nombres'>
								</FormControl>
							</DialogContent>
						</Dialog>
					</div>
				}
				selectableRows
				paginationComponentOptions={{
					rangeSeparatorText: 'de',
					rowsPerPageText: 'Usuarios por pagina',
					selectAllRowsItem: true,
					selectAllRowsItemText: 'Todos'
				}}
				pointerOnHover
				striped
				subHeader={Boolean(data)}
				pagination
				subHeaderComponent={<div>
					<TextField label="Buscar usuario" size='small' />
				</div>}
				subHeaderAlign={Alignment.LEFT}
				title={<Typography variant='h5' component={'div'} align='left'>Lista de usuarios</Typography>}
				responsive
				fixedHeader
				highlightOnHover
				noDataComponent={
					<div>
						<Typography variant='h6' style={{ color: 'orange', display: 'flex', alignItems: 'center', gap: '5px' }} >
							<Warning />
							{error?.message}
						</Typography>
						<Button LinkComponent={'div'} onClick={() => refetch()}>Volver a cargar</Button>
					</div>
				}
				progressPending={isLoading}
				progressComponent={<CircularProgress />}
			/>
		</>
	)
};

export default UserList;
