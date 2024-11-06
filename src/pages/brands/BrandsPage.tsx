import { lazy } from "react"

import { Routes, Route } from "react-router-dom"

import ScrollTop from "@/components/ScrollTop"
import SuspenseComponent from "@/components/SuspenseComponent"

const BrandList = lazy(() => import("./components/BrandList"))
const BrandForm = lazy(() => import("./components/BrandForm"))

const BrandsPage = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route
          path=""
          element={
            <SuspenseComponent>
              <BrandList />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/nuevo"
          element={
            <SuspenseComponent>
              <BrandForm />
            </SuspenseComponent>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <SuspenseComponent>
              <BrandForm edit />
            </SuspenseComponent>
          }
        ></Route>
      </Routes>
    </ScrollTop>
  )
}

export default BrandsPage
