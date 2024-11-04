import { useEffect, useState } from "react"

import { Eye, EyeSlash, UserCircleGear } from "@phosphor-icons/react"
import { Button, Input, Avatar, Toggle } from "keep-react"
import { useForm } from "react-hook-form"

import { DotAnimation } from "@/components/DotAnimation"
import Header from "@/components/Header"
import { delay } from "@/common/helpers/delay"
import { UsuarioData } from "@/pages/users/interfaces/usuarios.interface"

const PerfilPage = () => {
  const [waitData, setWaitData] = useState<UsuarioData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [changePassword, setChangePassword] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    criteriaMode: "all",
  })

  const httpGetOne = async (id: number | string) => {
    console.log("cargar user", id)
    await delay(3000)
    setWaitData({
      id: 1,
      nombres: "Alvaro Maverick",
      ci: "123456789",
      parroquia: "San Pedro",
    })
    setValue("nombres", "Alvaro Maverick")
  }

  const httpUpdate = async () => {
    setIsLoading(true)
    const payload = {}
    console.log("update user", payload)
    await delay(3000)
    setIsLoading(false)
  }

  const handleSubmit = async () => {
    httpUpdate()
  }

  useEffect(() => {
    httpGetOne(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!waitData) {
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
    <div className="flex flex-col gap-4 text-custom items-center">
      <Header className="bg-primary-25 dark:bg-primary-800">
        <div className="flex flex-col items-center justify-center md:flex-row gap-8">
          <h1 className="flex gap-4 text-4xl font-bold">
            <UserCircleGear />
            Mi perfil
          </h1>
        </div>
      </Header>
      <div className="flex flex-col w-full md:w-[400px] gap-4 pb-48">
        <div className="text-lg font-bold">Foto de perfil</div>
        <div className="flex gap-4">
          <Avatar alt="avatar" className="dark:text-white/80" />
          <Button>Cambiar Foto</Button>
          <Button color="secondary">Eliminar Foto</Button>
        </div>
        <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-4 w-full">
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
            <label>Carnet de Identidad:</label>
            <Input
              defaultValue={waitData?.ci || ""}
              className="dark:bg-metal-800 pointer-events-none opacity-60"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Parroquia:</label>
            <Input
              defaultValue={waitData?.parroquia || ""}
              className="dark:bg-metal-800 pointer-events-none opacity-60"
            />
          </div>

          <div className="flex flex-col gap-4 bg-primary-25 dark:bg-[#262424] rounded-xl p-4">
            <div className="text-custom text-xl font-bold mt-5 mb-1">
              Cambiar contraseña:
            </div>
            <div className="flex flex-col gap-2">
              <Toggle
                onChange={(e) => {
                  setChangePassword(e)
                }}
              />
            </div>
            {changePassword && (
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
  password: string
}

export default PerfilPage
