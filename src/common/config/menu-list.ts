import { ElementType } from "react"

import { AppsFilled, CubeFilled, HomeFilled, PeopleTeamFilled, PersonLockFilled, SettingsFilled, SparkleFilled } from "@fluentui/react-icons"

import { ROLES_ENABLED } from "./access"

export interface MenuItem {
  icon: ElementType
  label: string
  path: string
  access: ROLES_ENABLED[]
}

export const MenuList: MenuItem[] = [
  {
    icon: HomeFilled,
    label: "Dashboard",
    path: "/",
    access: [ROLES_ENABLED.ADMIN, ROLES_ENABLED.SELLER, ROLES_ENABLED.NONE],
  },
  {
    icon: AppsFilled,
    label: "Categorias",
    path: "/categorias",
    access: [ROLES_ENABLED.ADMIN],
  },
  {
    icon: SparkleFilled,
    label: "Marcas",
    path: "/marcas",
    access: [ROLES_ENABLED.ADMIN],
  },
  {
    icon: CubeFilled,
    label: "Productos",
    path: "/productos",
    access: [ROLES_ENABLED.ADMIN],
  },
  {
    icon: PeopleTeamFilled,
    label: "Clientes",
    path: "/clientes",
    access: [ROLES_ENABLED.ADMIN],
  },
  {
    icon: PersonLockFilled,
    label: "Usuarios",
    path: "/usuarios",
    access: [ROLES_ENABLED.ADMIN],
  },
  {
    icon: SettingsFilled,
    label: "Configuración",
    path: "/configuracion",
    access: [ROLES_ENABLED.ADMIN, ROLES_ENABLED.SELLER],
  },
]
