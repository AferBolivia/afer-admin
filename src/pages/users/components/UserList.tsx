import { KeyboardEvent, useEffect, useRef, useState } from "react"

import { AddCircleFilled, CheckmarkCircleRegular, PersonLockFilled, ProhibitedFilled } from "@fluentui/react-icons"
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
import { NavLink } from "react-router-dom"
import { Tooltip } from "react-tooltip"

import { cancelUserPetition, getUsers } from "@/common/api/user.api"
import { UserResponse } from "@/common/interfaces/users.interface"
import { DotAnimation } from "@/components/DotAnimation"
import Header from "@/components/Header"
import PaginationCustom from "@/components/PaginationCustom"
import TableSkeleton from "@/components/TableSkeleton"

interface Pagination {
  index: number
  count: number
  total: number
}

const UserList = () => {
  const inputSearch = useRef<HTMLInputElement>(null)
  const [list, setList] = useState<UserResponse[]>([])
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
      const response = await getUsers({
        page: pageIndex ?? 1,
        search: currentSearch
      })
      const { users, pagination } = response
      if (!users) {
        setMessageError("no hay usuarios")
        return
      }
      setList(users)
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
      cancelUserPetition()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col text-custom">
      <Header className="bg-white dark:bg-basic-gradient">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex gap-4 font-bold">
            <PersonLockFilled
              style={{ width: 48, height: 48 }}
              className="text-afer-950 dark:text-afer-400"
            />
            <div className="flex flex-col">
              <h1 className="text-afer-950 dark:text-afer-400 font-black text-4xl leading-none">
                {recentSearch === "" ? "Usuarios" : recentSearch}
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
                Crear Usuario
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
              placeholder="Buscar un usuario"
              className="w-full pr-16 !outline-afer-500 dark:!outline-none placeholder:text-afer-gray-800"
            />
          </fieldset>
        </div>

        {loading && (
          <div className="w-full flex">
            <TableSkeleton cols={6} rows={20}></TableSkeleton>
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="flex flex-col gap-8 justify-center pb-20">
            <Table>
              <TableHeader className="sticky">
                <TableRow>
                  <TableHead className="w-2">Estado</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombres</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((user: UserResponse) => (
                  <TableRow key={`user-${user.id}`}>
                    <TableCell className="text-center">
                      <Tooltip anchorSelect={`.user-status-${user.id}`} place="top">
                        {user.status ? 'Habilitado' : 'Deshabilitado' }
                      </Tooltip>
                      {user.status ? (
                        <CheckmarkCircleRegular className={`user-status-${user.id} w-6 h-6 text-gray-500 hover:text-afer-success`} />
                        // <CheckCircle className={`user-status-${user.id} w-6 h-6 text-gray-500 hover:text-afer-success`} weight="bold" />
                        ) : (
                          <ProhibitedFilled className={`user-status-${user.id} w-6 h-6 text-afer-error/40`}/>
                        // <Prohibit className={`user-status-${user.id} w-6 h-6 text-afer-error/40 rotate-90`} weight="bold"/>
                      )}
                    </TableCell>
                    <TableCell className="!normal-case">{user.id}</TableCell>
                    <TableCell className="!normal-case">{user.name}</TableCell>
                    <TableCell className="!normal-case">{user.email}</TableCell>
                    <TableCell className="!normal-case">{user.role}</TableCell>
                    <TableCell className="!normal-case">
                      <div className="flex gap-2">
                        <NavLink to={`./${user.id}`}>
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
          <div className="flex flex-col gap-8 justify-center pb-20">No hay datos</div>
        )}

        {messageError && (
          <div className="flex flex-col gap-8 justify-center pb-20">
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
