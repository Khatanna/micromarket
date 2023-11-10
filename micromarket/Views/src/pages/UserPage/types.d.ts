interface Rol {
  nombre: string
}

interface Usuario {
  nombres: string
  nombre_de_usuario: string
  apellido_paterno: string
  apellido_materno: string
  estado: string
  roles: Rol[]
}
