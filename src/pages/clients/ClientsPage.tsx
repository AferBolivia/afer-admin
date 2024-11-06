import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import ScrollTop from "@/components/ScrollTop"
import SuspenseComponent from "@/components/SuspenseComponent"

const ClientList = lazy(() => import("./components/ClientList"))
const ClientForm = lazy(() => import("./components/ClientForm"))

const ClientsPage = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <ClientList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/nuevo"
          element={
            <SuspenseComponent>
              <ClientForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <SuspenseComponent>
              <ClientForm edit />
            </SuspenseComponent>
          }
        ></Route>
      </Routes>
    </ScrollTop>
  )
}

export default ClientsPage
