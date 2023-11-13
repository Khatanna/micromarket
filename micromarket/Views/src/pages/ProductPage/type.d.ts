interface Product {
  id: string;
  codigo: string;
  nombre: string;
  precio: string;
  descripción: string;
  imagenURL: string;
  categoria: {
    nombre: string;
  };
}
