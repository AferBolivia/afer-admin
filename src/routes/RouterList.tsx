import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import AuthControl from "./components/AuthControl"
import LoginControl from "./components/LoginControl"

import LogoutPage from "@/pages/logout/LogoutPage"
import NotmatchPage from "@/pages/notmatch/NotmatchPage"

const HomePage = lazy(() => import("@/pages/home/HomePage"))
const CategoriesPage = lazy(() => import("@/pages/categories/CategoriesPage"))
const BrandsPage = lazy(() => import("@/pages/brands/BrandsPage"))
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"))
const UsuariosPage = lazy(() => import("@/pages/users/UsersPage"))
const ClientsPage = lazy(() => import("@/pages/clients/ClientsPage"))

const ConfiguracionPage = lazy(() => import("@/pages/configuracion/ConfiguracionPage"))
const PerfilPage = lazy(() => import("@/pages/perfil/PerfilPage"))

const RouterList = () => {
  return (
    <Routes>
      <Route path="*" element={<NotmatchPage />} />
      <Route path="/" element={<AuthControl element={HomePage} />} />
      <Route path="/categorias/*" element={<AuthControl element={CategoriesPage} />} />
      <Route path="/marcas/*" element={<AuthControl element={BrandsPage} />} />
      <Route path="/productos/*" element={<AuthControl element={ProductsPage} />} />
      <Route path="/clientes/*" element={<AuthControl element={ClientsPage} />} />
      <Route path="/usuarios/*" element={<AuthControl element={UsuariosPage} />} />
      <Route
        path="/configuracion/*"
        element={<AuthControl element={ConfiguracionPage} />}
      />
      <Route path="/perfil/*" element={<AuthControl element={PerfilPage} />} />
      <Route path="/logout" element={<AuthControl element={LogoutPage} />} />
      <Route path="/login/*" element={<LoginControl />} />
    </Routes>
  )
}

export default RouterList
