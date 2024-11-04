import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import AuthControl from "./components/AuthControl"
import LoginControl from "./components/LoginControl"

import LogoutPage from "@/pages/logout/LogoutPage"
import NotmatchPage from "@/pages/notmatch/NotmatchPage"

const HomePage = lazy(() => import("@/pages/home/HomePage"))
const CategoriesPage = lazy(() => import("@/pages/categorias/CategoriesPage"))
const UsuariosPage = lazy(() => import("@/pages/users/UsersPage"))

const ConfiguracionPage = lazy(() => import("@/pages/configuracion/ConfiguracionPage"))
const PerfilPage = lazy(() => import("@/pages/perfil/PerfilPage"))

const RouterList = () => {
  return (
    <Routes>
      <Route path="*" element={<NotmatchPage />} />
      <Route path="/" element={<AuthControl element={HomePage} />} />
      <Route path="/categorias/*" element={<AuthControl element={CategoriesPage} />} />
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
