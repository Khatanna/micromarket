import { Category } from "../CategoryPage/types";

interface Product {
  id: string;
  codigo: string;
  nombre: string;
  precio: string;
  descripción: string;
  imagenURL: string;
  categoria: Category;
  categoriaId: string;
}
