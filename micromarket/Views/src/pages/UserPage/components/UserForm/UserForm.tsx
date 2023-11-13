import { Stack, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxiosStore } from "../../../../state/useAxiosStore";
import { toast } from "sonner";

export type UserFormProps = {
  onClose: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  const { axios } = useAxiosStore();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<Usuario>();
  const { mutate } = useMutation<
    Usuario,
    unknown,
    Usuario,
    { optimisticData: Usuario[] | undefined }
  >({
    mutationFn: async (data) => {
      return (await axios.post("/users", data)).data;
    },
    onMutate: ({ nombres, apellido_paterno, apellido_materno }) => {
      const previousData = queryClient.getQueryData<Usuario[]>(["getAllUsers"]);
      queryClient.setQueryData(
        ["getAllUsers"],
        [
          ...(previousData ?? []),
          {
            nombres,
            apellido_materno,
            apellido_paterno,
            nombre_de_usuario: `${nombres}.${apellido_paterno}`,
            contraseña: `${nombres}.${apellido_paterno}`,
            estado: "ENABLE",
            roles: [],
          },
        ],
      );

      return { optimisticData: previousData };
    },
  });
  const submit = (data: Usuario) => {
    mutate(data, {
      onSuccess({ nombres }) {
        toast.success(`Usuario (${nombres}) creado`);
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
        onClose();
      },
      onError(error, { nombres }, context) {
        toast.error(`No se pudo crear el usuario: (${nombres})`);
        if (context?.optimisticData) {
          queryClient.setQueryData(["getAllUsers"], context.optimisticData);
        }
      },
      onSettled() {},
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack spacing={3}>
        <Stack>
          <TextField
            {...register("nombres")}
            label="Nombres"
            variant="standard"
          />
        </Stack>
        <Stack spacing={2} direction={"row"}>
          <TextField
            {...register("apellido_paterno")}
            label="Apellido paterno"
            variant="standard"
          />
          <TextField
            {...register("apellido_materno")}
            label="Apellido materno"
            variant="standard"
          />
        </Stack>
        <Button type="submit" variant="contained" color="success">
          Crear
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
