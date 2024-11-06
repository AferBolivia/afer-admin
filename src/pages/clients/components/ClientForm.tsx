import { useEffect, useState } from "react"

import { ArrowLeft, Eye, EyeSlash } from "@phosphor-icons/react"
import { Button, Input } from "keep-react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { UsuarioData } from "../interfaces/usuarios.interface"

import { DotAnimation } from "@/components/DotAnimation"
import { delay } from "@/common/helpers/delay"

const UserForm = ({ edit = false }: UserFormProps) => {
  const [waitData, setWaitData] = useState<UsuarioData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

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

  const httpGetOne = async (id: number | string) => {
    console.log("cargar user", id)
    await delay(3000)
    setWaitData({
      id: 1,
      nombres: "Alvaro Maverick",
    })
    setValue("nombres", "Alvaro Maverick")
  }

  const httpCreate = async () => {
    setIsLoading(true)
    const payload = {}
    console.log("create user", payload)
    await delay(3000)
    reset()
    setIsLoading(false)
  }

  const httpUpdate = async () => {
    setIsLoading(true)
    const payload = {}
    console.log("update user", payload)
    await delay(3000)
    setIsLoading(false)
  }

  const handleSubmit = async () => {
    if (edit) {
      httpUpdate()
    } else {
      httpCreate()
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (edit && params) {
      if (params?.id) {
        httpGetOne(params?.id)
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
          {edit ? "Editar Usuario" : "Nuevo Usuario"}
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full md:w-[400px]"
        >
          <div className="flex flex-col gap-2">
            <label>
              Nombres: <span className="text-rose-700">*</span>
            </label>
            <Input
              defaultValue={waitData?.nombres || ""}
              placeholder="Nombres"
              className="dark:bg-metal-800"
              {...register("nombres", {
                required: "Ingrese nombre de usuario",
              })}
            />
            {errors.nombres && (
              <p className="text-red-500 text-sm mt-1">{errors.nombres.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Apellido Paterno: <span className="text-rose-700">*</span>
            </label>
            <Input
              defaultValue={waitData?.apellidoPaterno || ""}
              placeholder="Apellido paterno"
              className="dark:bg-metal-800"
              {...register("apellidoPaterno", {
                required: "Ingrese apellido paterno",
              })}
            />
            {errors.apellidoPaterno && (
              <p className="text-red-500 text-sm mt-1">
                {errors.apellidoPaterno.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Apellido Materno: <span className="text-rose-700">*</span>
            </label>
            <Input
              defaultValue={waitData?.apellidoMaterno || ""}
              placeholder="Apellido materno"
              className="dark:bg-metal-800"
              {...register("apellidoMaterno", {
                required: "Ingrese apellido materno",
              })}
            />
            {errors.apellidoMaterno && (
              <p className="text-red-500 text-sm mt-1">
                {errors.apellidoMaterno.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Carnet de Identidad: <span className="text-rose-700">*</span>
            </label>
            <Input
              type="number"
              defaultValue={waitData?.ci || ""}
              placeholder="Carnet de identidad"
              className="dark:bg-metal-800"
              {...register("ci", {
                required: "Ingrese carnet de identidad",
              })}
            />
            {errors.ci && (
              <p className="text-red-500 text-sm mt-1">{errors.ci.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Contraseña: <span className="text-rose-700">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type={showPassword ? "text" : "password"}
                defaultValue={waitData?.password || ""}
                placeholder="Ingrese contraseña"
                className="dark:bg-metal-800"
                {...register("password", {
                  required: "Se requiere contraseña",
                })}
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                className="flex justify-center items-center py-2 px-3 rounded-lg text-[#1ba8f6] bg-[#1ba8f6]/20 select-none cursor-pointer"
              >
                {showPassword ? (
                  <EyeSlash size={32} className="w-4 h-4" />
                ) : (
                  <Eye size={20} className="w-4 h-4" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Parroquia: <span className="text-rose-700">*</span>
            </label>
            <select
              defaultValue={waitData?.parroquia || ""}
              className="select-custom"
              {...register("parroquia", {
                required: "Seleccione una parroquia",
              })}
            >
              <option value="" disabled>
                Elija una parroquia
              </option>
              <option>San Jorge</option>
            </select>
            {errors.parroquia && (
              <p className="text-red-500 text-sm mt-1">{errors.parroquia.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className={`${
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
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  ci: string
  password: string
  parroquia: string
}

type UserFormProps = {
  edit?: boolean
}

export default UserForm
