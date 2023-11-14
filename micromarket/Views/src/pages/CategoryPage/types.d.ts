export interface Category {
    id: string;
    padre?: Category;
    nombre: string;
    categorias?: Category[];
}