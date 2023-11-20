import { AddBox, Warning } from "@mui/icons-material";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Table, { Alignment, TableColumn } from "react-data-table-component";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { useProductContext } from "../../hooks/useProductContext";
import { Product } from "../../types";
import { ButtonMenu } from "../ButtonMenu";
import { defaultTableProps } from "../../../../utils/defaultTableProps";

export type ProductListProps = {};

const columns: TableColumn<Product>[] = [
  // {
  //   name: "Codigo",
  //   selector: (row) => row.codigo,
  //   sortable: true,
  // },
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
  {
    cell: (row) => <ButtonMenu product={row} />,
  },
];

const ProductList: React.FC<ProductListProps> = ({}) => {
  const { axios } = useAxiosStore();
  const [code, setCode] = useState("");
  const { showProduct, showFormProduct } = useProductContext();
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
        data={data ?? []}
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
              onClick={() => {
                showFormProduct();
              }}
            >
              Añadir producto
            </Button>
          </div>
        }
        subHeader={Boolean(data)}
        fixedHeaderScrollHeight="70vh"
        subHeaderComponent={subHeaderComponentMemo}
        subHeaderAlign={Alignment.LEFT}
        title={
          <Typography variant="h5" component={"div"} align="left">
            Lista de productos
          </Typography>
        }
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
        {...defaultTableProps}
      />
    </>
  );
};

export default ProductList;
