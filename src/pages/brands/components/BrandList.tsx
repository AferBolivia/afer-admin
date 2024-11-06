import { KeyboardEvent, useEffect, useRef, useState } from "react"

import { AddCircleFilled, SparkleFilled } from "@fluentui/react-icons"
import { Button, Input, InputIcon } from "keep-react"
import moment from "moment"
import { NavLink } from "react-router-dom"

import BrandCardView from "./brand-list-views/BrandCardView"
import BrandTableView from "./brand-list-views/BrandTableView"

import { cancelBrandPetition, getBrands } from "@/common/api/brand.api"
import { VIEW_TYPE } from "@/common/enums/view.enum"
import { useView } from "@/common/hooks/view.hook"
import { BrandResponse } from "@/common/interfaces/brand.interface"
import { DotAnimation } from "@/components/DotAnimation"
import Header from "@/components/Header"
import PaginationCustom from "@/components/PaginationCustom"
import SwitchView from "@/components/SwitchView"
import TableSkeleton from "@/components/TableSkeleton"

import "moment/dist/locale/es"
moment.locale("es")

interface Pagination {
  index: number
  count: number
  total: number
}

const BrandList = () => {
  const { view } = useView()
  const inputSearch = useRef<HTMLInputElement>(null)
  const [list, setList] = useState<BrandResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [messageError, setMessageError] = useState("")
  const [pagination, setPagination] = useState<Pagination>({
    index: 0,
    count: 0,
    total: 0,
  })

  const [currentSearch, setCurrentSearch] = useState<string>("")
  const [recentSearch, setRecentSearch] = useState<string>("")

  const getList = async (pageIndex?:number) => {
    setLoading(true)
    cleanPagination()
    try {
      const response = await getBrands({
        page: pageIndex ?? 1,
        search: currentSearch
      })
      const { brands, pagination } = response
      if (!brands) {
        setMessageError("no hay marcas")
        return
      }
      setList(brands)
      setPagination({
        count: pagination?.navigation?.last,
        index: pagination?.page?.index,
        total: pagination?.results?.count,
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const cleanPagination = () => {
    setPagination({
      index: 0,
      count: 0,
      total: 0,
    })
  }

  const onPageChange = async (index: number) => {
    await getList(index)
  }

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleSearch()
    }
  }

  const onReset = () => {
    setRecentSearch("")
    setCurrentSearch("")
    cleanPagination()
  }

  const handleSearch = () => {
    if (currentSearch !== "") {
      getList()
    }
  }

  useEffect(() => {
    if(recentSearch === "") {
      getList()
      if (!inputSearch) return
      if (!inputSearch.current) return
      inputSearch.current.focus()
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentSearch])

  useEffect(() => {
    setRecentSearch(currentSearch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    getList()
    return () => {
      cancelBrandPetition()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col text-custom">
      <Header className="bg-white dark:bg-basic-gradient">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex gap-4 font-bold">
            <SparkleFilled
              style={{ width: 48, height: 48 }}
              className="text-afer-950 dark:text-afer-400"
            />
            <div className="flex flex-col">
              <h1 className="text-afer-950 dark:text-afer-400 font-black text-4xl leading-none">
                {recentSearch === "" ? "Marcas" : recentSearch}
              </h1>
              {
                loading ? (
                  <span className="leading-none font-light">
                    Cargando
                    <DotAnimation $delay="500ms">.</DotAnimation>
                    <DotAnimation $delay="600ms">.</DotAnimation>
                    <DotAnimation $delay="700ms">.</DotAnimation>
                  </span>
                ) : (
                  <span className="leading-none font-light">
                    {pagination.total} {`resultado${pagination.total > 1 || pagination.total == 0 ? "s" : ""}`}
                  </span>
                )
              }
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NavLink to="./nuevo" className="w-full md:w-auto">
              <Button size="md" className="button-custom flex gap-1.5 w-full">
                <AddCircleFilled className="size-6" />
                Agregar Marca
              </Button>
            </NavLink>
          </div>
        </div>
      </Header>
      <div className="flex flex-col px-4 md:px-8 gap-4 my-4 pb-6">
        <div className="flex flex-row items-center justify-start gap-3">
          <SwitchView />
          <fieldset className="relative w-full md:w-1/3">
            <InputIcon className="absolute start-auto !end-3">
              {recentSearch === "" ? (
                <span className="text-xs font-workSans font-medium text-afer-600/80 pointer-events-auto select-none cursor-pointer" onClick={handleSearch}>BUSCAR</span>
              ) : (
                <span className="text-xs font-workSans font-medium text-afer-gray-800 pointer-events-auto select-none cursor-pointer" onClick={onReset}>RESET</span>
              )}
            </InputIcon>
            <Input
              ref={inputSearch}
              defaultValue={currentSearch}
              value={currentSearch}
              onChange={(e) => {
                setCurrentSearch(e.target.value)
              }}
              onKeyUp={onSearch}
              placeholder="Buscar una marca"
              className="w-full pr-16 !outline-afer-500 dark:!outline-none placeholder:text-afer-gray-800"
            />
          </fieldset>
        </div>

        {/* Loader Component */}
        {loading && (
          <div className="w-full flex pt-4">
            <TableSkeleton cols={6} rows={2}></TableSkeleton>
          </div>
        )}

        {!loading && list.length > 0 && (
          <>
            <div className="flex flex-col gap-8 justify-center pb-20 pt-4">
              {view === VIEW_TYPE.TABLE && <BrandTableView list={list} />}
              {view === VIEW_TYPE.CARD && <BrandCardView list={list} />}
              <div className="flex justify-center items-center">
                <PaginationCustom
                  pageCount={pagination.count}
                  selectedPage={pagination.index}
                  onPageChange={onPageChange}
                ></PaginationCustom>
              </div>
            </div>
          </>
        )}

        {!loading && list.length === 0 && (
          <div className="flex flex-col gap-8 justify-center pb-20 pt-4">No hay datos</div>
        )}

        {messageError && (
          <div className="flex flex-col gap-8 justify-center pb-20 pt-4">
            <Button size="lg" className="button-custom" onClick={() => getList()}>
              Volver a cargar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandList
