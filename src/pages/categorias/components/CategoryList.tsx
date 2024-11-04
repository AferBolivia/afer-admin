import { useEffect, useState } from "react"

import { AddCircleFilled, AppsRegular } from "@fluentui/react-icons"
import { Badge, Button } from "keep-react"
import moment from "moment"
import { NavLink } from "react-router-dom"

import "moment/dist/locale/es"
import CategoryCardView from "./CategoryCardView"
import CategoryTableView from "./CategoryTableView"

import { cancelCategoryPetition, getCategories } from "@/common/api/category.api"
import { VIEW_TYPE } from "@/common/enums/view.enum"
import { useView } from "@/common/hooks/view.hook"
import { CategoryResponse } from "@/common/interfaces/category.interface"
import Header from "@/components/Header"
import SwitchView from "@/components/SwitchView"
import TableSkeleton from "@/components/TableSkeleton"



moment.locale("es")

const CategoryList = () => {
  const { view } = useView()
  const [list, setList] = useState<CategoryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [messageError, setMessageError] = useState("")

  const getList = async () => {
    setLoading(true)
    try {
      const response = await getCategories()
      const categoryList = response
      if (!categoryList) {
        setMessageError("no hay categorias")
        return
      }
      setList(categoryList)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getList()
    return () => {
      cancelCategoryPetition()
    }
  }, [])

  return (
    <div className="flex flex-col text-custom">
      <Header className="bg-white">
        <div className="flex flex-col md:flex-row gap-8">
          <h1 className="flex gap-4 text-4xl font-bold">
            <AppsRegular
              style={{ width: 48, height: 48 }}
              className="text-afer-950"
            />
            <span className="text-afer-950">Categorias</span>
          </h1>
          <div className="flex items-center gap-5">
            <NavLink to="./nuevo">
              <Button
                color="primary"
                size="md"
                className="button-custom flex gap-1.5"
              >
                <AddCircleFilled className="size-6" />
                Crear Categoria
              </Button>
            </NavLink>
          </div>
        </div>
      </Header>
      <div className="flex flex-col px-4 md:px-8 gap-4 my-4">
        {/* <div className="flex gap-2">
          <fieldset className="flex justify-center items-center relative w-full md:w-1/3">
            <Input placeholder="Buscar" className="ps-11" />
            <InputIcon>
              <MagnifyingGlass size={19} color="#AFBACA" />
            </InputIcon>
          </fieldset>
          <Button size="lg" variant="outline" className="button-custom-outline">
            Buscar
          </Button>
        </div> */}
        {/* Loader Component */}
        {loading && (
          <div className="w-full flex">
            <TableSkeleton cols={6} rows={2}></TableSkeleton>
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="flex items-center gap-5">
            <SwitchView />
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">
              Total:
            </h2>
            <Badge color="secondary" className="dark:bg-metal-800 dark:text-white">
              {list.length}
            </Badge>
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="flex flex-col gap-8 justify-center pb-20">
            {view === VIEW_TYPE.TABLE && <CategoryTableView list={list} />}
            {view === VIEW_TYPE.CARD && <CategoryCardView list={list} />}
          </div>
        )}

        {!loading && list.length === 0 && (
          <div className="flex flex-col gap-8 justify-center pb-20">No hay datos</div>
        )}

        {messageError && (
          <div className="flex flex-col gap-8 justify-center pb-20">
            <Button size="lg" className="button-custom" onClick={getList}>
              Volver a cargar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryList
