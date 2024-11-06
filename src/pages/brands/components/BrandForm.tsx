import { useEffect, useState } from "react"

import { ArrowLeft } from "@phosphor-icons/react"
import { Button, Input, toast } from "keep-react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { createCategory, getCategoryById, updateCategory } from "@/common/api/category.api"
import { DotAnimation } from "@/components/DotAnimation"
import FallbackImage from "@/components/FallbackImage"
import { HOST } from "@/common/config/constants"
import { FOLDER_IMAGES } from "@/common/config/folder"
import { getShortName } from "@/common/helpers/avatar.helper"
import { CategoryResponse } from "@/common/interfaces/category.interface"

const CategoryForm = ({ edit = false }: CategoryFormProps) => {
  const [waitData, setWaitData] = useState<Pick<
    CategoryResponse,
    "id" | "name" | "description" | "picture"
  > | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    reset,
    setValue,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    criteriaMode: "all",
  })

  const navigate = useNavigate()
  const params = useParams()

  const httpGetOne = async (id: number) => {
    const response = await getCategoryById(id)
    if (response) {
      const recoveryData = {
        id: response.id,
        name: response.name,
        description: response.description,
        picture: response.picture,
      }
      setWaitData(recoveryData)
      setValue("name", response.name)
      setValue("description", response.description)
    }
  }

  const httpCreate = async ({ name, description, image }: FormValues) => {
    setIsLoading(true)
    try {
      await createCategory({
        name,
        description,
        image: image[0],
        folder: FOLDER_IMAGES.CATEGORIES,
      })
      toast.success("Registrado correctamente", {
        action: {
          label: "Volver al listado",
          onClick: () => navigate("/categorias"),
        },
      })
      reset()
    } catch (e) {
      console.error(e)
      toast.error("Hubo un error al guardar intente de nuevo")
    } finally {
      setIsLoading(false)
    }
  }

  const httpUpdate = async ({ name, description, image }: FormValues) => {
    setIsLoading(true)
    try {
      let payload = null
      if (image) {
        payload = {
          name,
          description,
          image: image[0],
          folder: FOLDER_IMAGES.CATEGORIES,
        }
      } else {
        payload = {
          name,
          description,
        }
      }
      if (!params) {
        return
      }
      if (!params?.id) {
        return
      }
      await updateCategory(+params?.id, payload)
      toast.success("Actualizado correctamente", {
        action: {
          label: "Volver al listado",
          onClick: () => navigate("/categorias"),
        },
      })
      await httpGetOne(+params?.id)
    } catch (e) {
      console.error(e)
      toast.error("Hubo un error al guardar intente de nuevo")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async ({ name, description, image }: FormValues) => {
    if (edit) {
      httpUpdate({
        name,
        description,
        image,
      })
    } else {
      httpCreate({
        name,
        description,
        image,
      })
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (edit && params) {
      if (params?.id) {
        httpGetOne(+params?.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (edit && !waitData) {
    return (
      <div className="text-custom relative">
        <div className="relative flex flex-col items-center w-full pb-14 px-14 gap-6">
          <div className="text-4xl font-workSans font-medium mt-28">
            Recuperando Datos
            <DotAnimation $delay="500ms">.</DotAnimation>
            <DotAnimation $delay="600ms">.</DotAnimation>
            <DotAnimation $delay="700ms">.</DotAnimation>
          </div>
        </div>
      </div>
    )
  }

  console.log(waitData)

  return (
    <div className="relative text-custom dark:bg-basic-gradient px-8 md:px-8">
      <div className="relative flex flex-col items-center w-full gap-6 pb-32">
        <div
          className="absolute flex items-center gap-4 h-8 cursor-pointer top-16 left-0 ml-0 md:ml-[10%]"
          onClick={handleBack}
        >
          <ArrowLeft size={20} />
          <span className="underline">Regresar Atrás</span>
        </div>
        <div className="text-4xl font-bold mt-28 pb-10">
          {edit ? "Editar Categoria" : "Nueva Categoria"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full md:w-[400px]"
        >
          <div className="flex flex-col gap-2">
            <label>
              Nombre categoria: <span className="text-rose-700">*</span>
            </label>
            <Input
              defaultValue={waitData?.name || ""}
              placeholder="Nombre categoria"
              className="dark:bg-metal-900 placeholder:text-black/50"
              {...register("name", {
                required: "Ingrese nombre de categoria",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Descripción: <span className="text-rose-700">*</span>
            </label>
            <Input
              defaultValue={waitData?.description || ""}
              placeholder="Descripción de la categoria"
              className="dark:bg-metal-900 placeholder:text-black/50"
              {...register("description", {
                required: "Ingrese una descripción",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          {edit && (
            <div className="flex flex-col gap-2 items-center">
              {waitData && waitData.picture ? (
                <FallbackImage
                  src={`${HOST}/pictures/${waitData?.picture?.folder}/${waitData?.picture?.url_picture}`}
                  alt={waitData?.name || "category"}
                  className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-md"
                >
                  <div className="w-28 h-28 flex justify-center items-center bg-afer-950 text-white dark:bg-afer-900 dark:text-afer-500 rounded-md">
                    <h3 className="font-bold text-4xl">
                      {getShortName(waitData?.name || "")}
                    </h3>
                  </div>
                </FallbackImage>
              ) : (
                <div className="w-28 h-28 md:w-40 md:h-40 flex justify-center items-center bg-afer-950 text-white dark:bg-afer-900 dark:text-afer-500 rounded-md">
                  <h3 className="font-bold text-4xl">
                    {getShortName(waitData?.name || "")}
                  </h3>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            {edit ? (
              <input type="file" accept="image/*" {...register("image")} />
            ) : (
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Suba una imagen",
                })}
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className={`button-custom ${
                isLoading ? "pointer-events-none opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex">
                  Guardando
                  <DotAnimation $delay="500ms">.</DotAnimation>
                  <DotAnimation $delay="600ms">.</DotAnimation>
                  <DotAnimation $delay="700ms">.</DotAnimation>
                </div>
              ) : (
                <div>Guardar</div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

type FormValues = {
  name: string
  description: string
  image: FileList
}

type CategoryFormProps = {
  edit?: boolean
}

export default CategoryForm
