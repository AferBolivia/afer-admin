import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import ScrollTop from "@/components/ScrollTop"
import SuspenseComponent from "@/components/SuspenseComponent"

const UsuarioList = lazy(() => import("./components/UserList"))
const UsuarioForm = lazy(() => import("./components/UserForm"))

const UsersPage = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <UsuarioList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/nuevo"
          element={
            <SuspenseComponent>
              <UsuarioForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <SuspenseComponent>
              <UsuarioForm edit />
            </SuspenseComponent>
          }
        ></Route>
      </Routes>
    </ScrollTop>
  )
}

export default UsersPage
