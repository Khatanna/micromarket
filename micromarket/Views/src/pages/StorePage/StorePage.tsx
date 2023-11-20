import { useQuery } from "@tanstack/react-query";
import { Store } from "./types";
import { useAxiosStore } from "../../state/useAxiosStore";
import { AxiosError, AxiosResponse } from "axios";
import Table, { TableColumn } from "react-data-table-component";
import { defaultTableProps } from "../../utils/defaultTableProps";
import { Button, Typography } from "@mui/material";
import { ButtonMenu } from "./components/ButtonMenu";

const columns: TableColumn<Store>[] = [
  {
    name: "Nombre",
    selector: (row) => row.producto.nombre,
    grow: 2,
    sortable: true,
  },
  {
    name: "Descripción",
    selector: (row) => row.producto.descripción,
    grow: 2,
    sortable: true,
    wrap: true,
  },
  {
    name: "Categoria",
    selector: (row) => row.producto.categoria.nombre,
    grow: 2,
    sortable: true,
  },
  {
    name: "Precio",
    selector: (row) => row.producto.precio.concat("Bs."),
    sortable: true,
  },
  {
    name: "Cantidad",
    selector: (row) => row.cantidad,
  },
  {
    cell: (row) => <ButtonMenu store={row} />,
  },
];

const StorePage = () => {
  const { axios } = useAxiosStore();
  const { data } = useQuery<AxiosResponse<Store[]>, AxiosError, Store[]>({
    queryKey: ["getAllStoreItems"],
    queryFn: async () => {
      return axios.get("/stores");
    },
    select: (data) => {
      return data.data;
    },
  });

  return (
    <Table
      columns={columns}
      data={data ?? []}
      title={
        <Typography variant="h5" component={"div"} align="left">
          Productos en almacen
        </Typography>
      }
      actions={
        <div>
          <Button variant="outlined">Registrar compra</Button>
        </div>
      }
      {...defaultTableProps}
    />
  );
};

export default StorePage;
