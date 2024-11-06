import { useEffect, useState } from "react"

import { Plus } from "@phosphor-icons/react"
import { Input, InputIcon, Spinner } from "keep-react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { NavLink } from "react-router-dom"

import { getCategories } from "@/common/api/category.api"
import { CategoryResponse } from "@/common/interfaces/category.interface"

const CategorySelect = <T extends FieldValues>({
  name,
  register,
  defaultValue,
}: CategorySelectProps<T>) => {
  const [categoryList, setCategoryList] = useState<CategoryResponse[] | null>(null)

  const handleCategoryList = async () => {
    const response = await getCategories()
    const categoryList = response
    setCategoryList(categoryList)
  }

  useEffect(() => {
    if (!categoryList) {
      handleCategoryList()
      window.addEventListener("reset", () => {
        setCategoryList(null)
        handleCategoryList()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const defaultItem = defaultValue || ""

  const ShowList = () => (
    <div className="w-full flex justify-center items-center gap-2">
      <div className="w-full rounded-lg border dark:border-metal-800">
        <select
          className="select-custom"
          defaultValue={defaultItem}
          {...register(name, {
            required: "Se requiere una categoria",
          })}
        >
          <option value="" disabled>
            Elija una categoria
          </option>
          {categoryList &&
            categoryList.map((category) => (
              <option value={category.id} key={`category-${category.id}`}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <NavLink
        to="/categorias/nuevo"
        className="button-custom w-10 h-10 shrink-0 flex justify-center items-center rounded-lg"
      >
        <Plus weight="bold" className="text-white" />
      </NavLink>
    </div>
  )

  const ShowEmpty = () => <div>Vacio</div>

  const CheckList = () =>
    categoryList && categoryList.length > 0 ? <ShowList /> : <ShowEmpty />

  const InputLoad = () => (
    <fieldset className="relative max-w-md">
      <Input
        type="text"
        className="pl-14 pointer-events-none"
        defaultValue="Cargando..."
      />
      <InputIcon>
        <Spinner color="warning" size="md" />
      </InputIcon>
    </fieldset>
  )

  return <>{categoryList ? <CheckList /> : <InputLoad />}</>
}

type CategorySelectProps<T extends FieldValues> = {
  name: Path<T>
  register: UseFormRegister<T>
  defaultValue?: number | string
}

export default CategorySelect
