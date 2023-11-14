import Table, { TableColumn} from 'react-data-table-component';
import { Category } from './types';
import { useQuery } from '@tanstack/react-query';
import { useAxiosStore } from '../../state/useAxiosStore';

const columns: TableColumn<Category>[] = [
    {
        name: 'Nombre',
        selector: row => row.nombre
    }
]

const CategoryPage = () => {
    const {axios} = useAxiosStore();
    const { data, isLoading, error } = useQuery<Category[]>({
        queryKey: ["getAllCategories"],
        queryFn: async () => {
          return (await axios.get("/categories")).data;
        },
      });
    return (
        <Table columns={columns} data={data ?? []}/>
    )
}

export default CategoryPage;
