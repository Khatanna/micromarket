import { AddBox, Rowing, Warning } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
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
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { ProductForm } from "../ProductForm";
import { ButtonMenu } from "../ButtonMenu";
import Barcode from "react-barcode";

export type ProductListProps = {};

const columns: TableColumn<Product>[] = [
  {
    name: "Codigo",
    selector: (row) => row.codigo,
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    grow: 2,
  },
  {
    name: "Descripción",
    selector: (row) => row.descripción,
    grow: 3,
  },
  {
    name: "Categoria",
    selector: (row) => row.categoria.nombre,
    grow: 2,
  },
  {
    name: "Precio",
    selector: (row) => row.precio.concat("Bs."),
  },
  {
    name: "Imagen",
    cell: (row) => (
      <img src={row.imagenURL} alt={row.nombre} title={row.nombre} width={50} />
    ),
  },
  {
    cell: (row) => <ButtonMenu product={row} />,
  },
];

const ProductList: React.FC<ProductListProps> = ({}) => {
  const { axios } = useAxiosStore();
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [product, setProduct] = useState<Product>();
  const { data, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      return (await axios.get("/products")).data;
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        selectableRows
        paginationComponentOptions={{
          rangeSeparatorText: "de",
          rowsPerPageText: "Productos por pagina",
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todos",
        }}
        actions={
          <div>
            <Button
              variant="outlined"
              color="success"
              startIcon={<AddBox />}
              onClick={handleOpen}
            >
              Añadir producto
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Crear producto</DialogTitle>
              <DialogContent>
                <ProductForm onClose={handleClose}></ProductForm>
              </DialogContent>
            </Dialog>
          </div>
        }
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
            Lista de productos
          </Typography>
        }
        responsive
        fixedHeader
        fixedHeaderScrollHeight="20%"
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
        onRowDoubleClicked={(row) => {
          setProduct(row);
          setOpenDetail(true);
        }}
        progressPending={isLoading}
        progressComponent={<CircularProgress />}
      />
      {!!product && (
        <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
          <DialogTitle>Detalle del producto</DialogTitle>
          <DialogContent>
            <Card sx={{ maxWidth: 550 }}>
              <CardContent className="flex flex-row gap-3">
                <div className="">
                  <CardMedia
                    component={"img"}
                    image={product.imagenURL}
                    title={product.nombre}
                  />
                  <Barcode value={product.codigo} width={1.4} height={50} />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex gap-2 flex-col ">
                    <Typography variant="body2" color="text.secondary">
                      <Chip
                        label={product.categoria.nombre}
                        variant="outlined"
                        color="success"
                        size="small"
                      />
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.nombre}
                    </Typography>

                    <div className="font-semibold">{product.descripción}</div>
                  </div>
                  <div className="self-end">
                    <Typography variant="h4" color="Highlight">
                      {product.precio} Bs.
                    </Typography>
                  </div>
                </div>
              </CardContent>

              {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductList;
