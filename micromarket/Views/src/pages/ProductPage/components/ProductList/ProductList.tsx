import { AddBox, Scanner, Warning } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import Table, { Alignment, TableColumn } from "react-data-table-component";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { useProductStore } from "../../state/useProductStore";
import { ButtonMenu } from "../ButtonMenu";
import { ProductDetail } from "../ProductDetail";
import { ProductForm } from "../ProductForm";
import { ProductScanner } from "../ProductScanner";
import { Product } from "../../types";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductImage } from "../ProductImage";

export type ProductListProps = {};

const columns: TableColumn<Product>[] = [
  {
    name: "Codigo",
    selector: (row) => row.codigo,
    sortable: true,
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    grow: 2,
    sortable: true,
  },
  {
    name: "Descripción",
    selector: (row) => row.descripción,
    grow: 3,
    sortable: true,
  },
  {
    name: "Categoria",
    selector: (row) => row.categoria.nombre,
    grow: 2,
    sortable: true,
  },
  {
    name: "Precio",
    selector: (row) => row.precio.concat("Bs."),
    sortable: true,
  },
  // {
  //   name: "Imagen",
  //   cell: (row) => <ProductImage product={row} height={50} width={50} />,
  // },
  {
    cell: (row) => <ButtonMenu product={row} />,
  },
];

const ProductList: React.FC<ProductListProps> = ({}) => {
  const { axios } = useAxiosStore();
  const [code, setCode] = useState("");
  const { showProduct } = useProductContext();
  const { data, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      return (await axios.get("/products")).data;
    },
  });
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <TextField
        size="small"
        label="Buscar por codigo"
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
    );
  }, [code]);

  return (
    <>
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
        data={
          data?.filter((p) =>
            p.codigo.toLocaleLowerCase().includes(code.toLowerCase()),
          ) ?? []
        }
        selectableRows
        paginationComponentOptions={{
          rangeSeparatorText: "de",
          rowsPerPageText: "Productos por pagina",
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todos",
        }}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outlined"
              color="success"
              startIcon={<AddBox />}
              onClick={
                () => {}
                // handleOpen({
                //   title: "Crear producto",
                //   contentKey: "modalCreate",
                // })
              }
            >
              Añadir producto
            </Button>
          </div>
        }
        pointerOnHover
        striped
        subHeader={Boolean(data)}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        subHeaderComponent={subHeaderComponentMemo}
        subHeaderAlign={Alignment.LEFT}
        title={
          <Typography variant="h5" component={"div"} align="left">
            Lista de productos
          </Typography>
        }
        responsive
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
                ? "Aun no hay productos en el sistema 🤯"
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
        onRowDoubleClicked={(product) => {
          showProduct(product);
        }}
        progressPending={isLoading}
        progressComponent={<CircularProgress />}
      />
    </>
  );
};

export default ProductList;
