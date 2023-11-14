import { PersonAdd, Warning } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Table, { Alignment, TableColumn } from "react-data-table-component";
import { ButtonMenu } from "../ButtonMenu";
import { UserForm } from "../UserForm";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { MagicMotion, MagicCard } from "react-magic-motion";
export type UserListProps = {};

const columns: TableColumn<Usuario>[] = [
  {
    name: "Usuario",
    selector: ({ nombres, apellido_paterno, apellido_materno }) =>
      `${nombres} ${apellido_paterno} ${apellido_materno}`,
      sortable: true,
  },
  {
    name: "Nombre de usuario",
    selector: (row) => row.nombre_de_usuario,
    sortable: true,
  },
  {
    name: "Estado",
    selector: (row) =>
      row.estado === "ENABLE" ? "Habilitado" : "Deshabilitado",
      sortable: true,
  },
  {
    name: "Roles",
    selector: (row) => row.roles.map((r) => r.nombre).join(" - "),
    sortable: true,
  },
  {
    cell: (row) => <ButtonMenu user={row} />,
    center: true,
    grow: 1,
  },
];

const UserList: React.FC<UserListProps> = ({}) => {
  const { axios } = useAxiosStore();
  const [open, setOpen] = useState(false);
  const { data, isLoading, error, refetch } = useQuery<Usuario[]>({
    queryKey: ["getAllUsers"],
    queryFn: async () => {
      return (await axios.get("/users")).data;
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Table
      customStyles={{
        noData: {
          style: {
            height: "100%",
          },
        },
        progress: {
          style: {
            height: "100%",
          },
        },
      }}
      columns={columns}
      data={data ?? []}
      actions={
        <div>
          <Button
            variant="outlined"
            color="success"
            startIcon={<PersonAdd />}
            onClick={handleOpen}
          >
            Añadir usuario
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crear usuario</DialogTitle>
            <DialogContent>
              <UserForm onClose={handleClose}></UserForm>
            </DialogContent>
          </Dialog>
        </div>
      }
      selectableRows
      paginationComponentOptions={{
        rangeSeparatorText: "de",
        rowsPerPageText: "Usuarios por pagina",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
      }}
      pointerOnHover
      striped
      subHeader={Boolean(data)}
      pagination
      subHeaderComponent={
        <div>
          <TextField label="Buscar usuario" size="small" />
        </div>
      }
      subHeaderAlign={Alignment.LEFT}
      title={
        <Typography variant="h5" component={"div"} align="left">
          Lista de usuarios
        </Typography>
      }
      responsive
      fixedHeader
      fixedHeaderScrollHeight="75%"
      highlightOnHover
      noDataComponent={
        <div>
          <Typography
            variant="h6"
            style={{
              color: error ? "orange" : "green",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {error && <Warning />}
            {data && data.length === 0
              ? "Me parece que estas solo aqui 😮"
              : error
              ? error.message
              : "Ocurrio un error 😥"}
          </Typography>
          {error && (
            <Button LinkComponent={"div"} onClick={() => refetch()}>
              Volver a cargar
            </Button>
          )}
        </div>
      }
      progressPending={isLoading}
      progressComponent={<CircularProgress />}
    />
  );
};

export default UserList;
