import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import ScrollTop from "@/components/ScrollTop"
import SuspenseComponent from "@/components/SuspenseComponent"

const CategoryList = lazy(() => import("./components/CategoryList"))
const CategoryForm = lazy(() => import("./components/CategoryForm"))

const CategoriasPage = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <CategoryList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/nuevo"
          element={
            <SuspenseComponent>
              <CategoryForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <SuspenseComponent>
              <CategoryForm edit />
            </SuspenseComponent>
          }
        ></Route>
      </Routes>
    </ScrollTop>
  )
}

export default CategoriasPage
