export enum ROLES_ENABLED {
  NONE = "NONE",
  USER = "USER",
  SELLER = "SELLER",
  ADMIN = "ADMIN"
}

export const ACCESS_CONFIG = {
  ADMIN: [
    "/",
    "/categorias",
    "/categorias/nuevo",
    "/categorias/:id",
    "/marcas",
    "/marcas/nuevo",
    "/marcas/:id",
    "/productos",
    "/productos/nuevo",
    "/productos/:id",
    "/clientes",
    "/clientes/nuevo",
    "/clientes/:id",
    "/usuarios",
    "/usuarios/nuevo",
    "/usuarios/:id",
    "/configuracion",
    "/perfil",
    "/logout",
  ],
  SELLER: ["/", "/perfil", "/logout"],
  USER: ["/", "/perfil", "/logout"],
  NONE: ["/", "/logout"],
}

export default {}
