import { KeyboardEvent, useEffect, useRef, useState } from "react"

import { AddCircleFilled, FoodCakeFilled, PeopleTeamFilled } from "@fluentui/react-icons"
import {
  PencilSimpleLine,
  TrashSimple
} from "@phosphor-icons/react"
import {
  Button,
  Input,
  InputIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react"
import moment from "moment"
import { NavLink } from "react-router-dom"

import { getClients, cancelClientPetition } from "@/common/api/client.api"
import { ClientResponse } from "@/common/interfaces/clients.interface"
import { DotAnimation } from "@/components/DotAnimation"
import Header from "@/components/Header"
import PaginationCustom from "@/components/PaginationCustom"
import TableSkeleton from "@/components/TableSkeleton"

import "moment/dist/locale/es"
moment.locale("es")

interface Pagination {
  index: number
  count: number
  total: number
}

const UserList = () => {
  const inputSearch = useRef<HTMLInputElement>(null)
  const [list, setList] = useState<ClientResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [messageError, setMessageError] = useState<string>("")
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
      const response = await getClients({
        page: pageIndex ?? 1,
        search: currentSearch
      })
      const { clients, pagination } = response
      if (!clients) {
        setMessageError("no hay clientes")
        return
      }
      setList(clients)
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

  const formattedData = (date: string) => {
    return moment(date, 'YYYY/MM/DD').format('D [de] MMMM')
  }

  const isBirthday = (date: string): boolean => {
    const currentDay = moment(date, 'YYYY/MM/DD');
    const today = moment();
    
    return currentDay.date() === today.date() && currentDay.month() === today.month();
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
      cancelClientPetition()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col text-custom">
      <Header className="bg-white dark:bg-basic-gradient">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex gap-4 font-bold">
            <PeopleTeamFilled
              style={{ width: 48, height: 48 }}
              className="text-afer-950 dark:text-afer-400"
            />
            <div className="flex flex-col">
              <h1 className="text-afer-950 dark:text-afer-400 font-black text-4xl leading-none">
                {recentSearch === "" ? "Clientes" : recentSearch}
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
                Agregar Cliente
              </Button>
            </NavLink>
          </div>
        </div>
      </Header>
      <div className="flex flex-col px-4 md:px-8 gap-4">
        <div className="flex flex-col md:flex-row md:items-start items-center justify-start gap-4">
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
              placeholder="Buscar un cliente"
              className="w-full pr-16 !outline-afer-500 dark:!outline-none placeholder:text-afer-gray-800"
            />
          </fieldset>
        </div>

        {loading && (
          <div className="w-full flex pt-4">
            <TableSkeleton cols={6} rows={20}></TableSkeleton>
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="flex flex-col gap-8 justify-center pb-20 pt-4">
            <Table>
              <TableHeader className="sticky">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>XY</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Celular</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Cumple</TableHead>
                  <TableHead>Visitas</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((client: ClientResponse) => (
                  <TableRow key={`client-${client.id}`}>
                    <TableCell className="!normal-case">{client.id}</TableCell>
                    <TableCell className="!normal-case">{client.gender}</TableCell>
                    <TableCell className="!normal-case">{client.fullname}</TableCell>
                    <TableCell className="!normal-case">{client.cellphone}</TableCell>
                    <TableCell className="!normal-case">{client.email}</TableCell>
                    <TableCell className="!normal-case">{isBirthday(client.birthday) && (<FoodCakeFilled className="w-6 h-6"/>)} {formattedData(client.birthday)}</TableCell>
                    <TableCell className="!normal-case">{client.visit_count}</TableCell>
                    <TableCell className="!normal-case">
                      <div className="flex gap-2">
                        <NavLink to={`./${client.id}`}>
                          <Button shape="icon" variant="link">
                            <PencilSimpleLine
                              size={20}
                              weight="duotone"
                              className="text-afer-gray-700"
                            />
                          </Button>
                        </NavLink>
                        <Button shape="icon" color="secondary" variant="link">
                          <TrashSimple
                            size={20}
                            weight="duotone"
                            className="text-afer-error/80"
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center items-center">
              <PaginationCustom
                pageCount={pagination.count}
                selectedPage={pagination.index}
                onPageChange={onPageChange}
              ></PaginationCustom>
            </div>
          </div>
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

export default UserList
