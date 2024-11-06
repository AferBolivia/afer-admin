import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import ScrollTop from "@/components/ScrollTop"
import SuspenseComponent from "@/components/SuspenseComponent"

const ProductList = lazy(() => import("./components/ProductList"))
const ProductForm = lazy(() => import("./components/ProductForm"))

const ClientsPage = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <ProductList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/nuevo"
          element={
            <SuspenseComponent>
              <ProductForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <SuspenseComponent>
              <ProductForm edit />
            </SuspenseComponent>
          }
        ></Route>
      </Routes>
    </ScrollTop>
  )
}

export default ClientsPage
