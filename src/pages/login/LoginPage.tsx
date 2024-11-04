import { useState } from "react"

import { Eye, EyeSlash } from "@phosphor-icons/react"
import cn from "classnames"
import { motion } from "framer-motion"
import { Button, Input, toast } from "keep-react"
import { useForm } from "react-hook-form"

import LoginLoader from "./components/LoginLoader"

import { AferLogo } from "@/assets/branding/AferLogo"
import { startSession } from "@/common/api/auth.api"
import { useAuth } from "@/common/hooks/auth.hook"
import CircleText from "@/components/CircleText"
import { DotAnimation } from "@/components/DotAnimation"

const LoginPage = () => {
  const { setAuth } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    criteriaMode: "all",
  })

  const httpSignIn = async ({ email, password }: FormValues) => {
    setIsLoading(true)
    try {
      const response = await startSession(email, password)
      if (!response) {
        setIsLoading(false)
        throw Error("Error en la respuesta, intente de nuevo")
      }
      const { user, token } = response
      setAuth({
        user,
        token,
      })
      toast.success("Acceso Correcto")
      reset()
    } catch (e) {
      console.error(e)
      toast.error("Su usuario o contraseña estan incorrectos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async ({ email, password }: FormValues) => {
    httpSignIn({ email, password })
  }

  return (
    <div className="relative text-custom min-h-screen bg-white dark:bg-metal-900 dark:bg-basic-gradient px-8 md:px-8 before:absolute before:w-full before:h-full before:bg-[url('/images/icons-background.webp')] before:bg-cover before:opacity-25">
      {isLoading && <LoginLoader />}
      <div className="relative flex flex-col items-center justify-center rounded-xl mt-10 mx-auto gap-6 py-6 w-full md:w-[400px]">
        <div className="flex flex-col items-center text-4xl font-bold">
          <div className="relative flex justify-center items-center  w-[220px] h-[220px]">
            <motion.div
              className="flex justify-center items-center w-[200px] h-[200px]"
              animate={{ rotate: 360 }} // Rotar 360 grados
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }} // Configura la transición
            >
              <CircleText
                className="text-[12px] text-afer-600 h-[200px] w-[200px] flex justify-center items-center"
                text="panel administrador * panel administrador * panel administrador * "
              />
            </motion.div>
            <AferLogo className="w-full h-[120px] absolute text-afer-500" />
          </div>
        </div>
        <form
          onSubmit={onSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full px-8"
        >
          <div className="flex flex-col gap-2">
            <label>
              Email: <span className="text-afer-700">*</span>
            </label>
            <Input
              type="string"
              placeholder="Ingrese su correo electrónico"
              className="placeholder:text-black/50"
              {...register("email", {
                required: "Ingrese su correo electrónico",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              Contraseña: <span className="text-afer-700">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese contraseña"
                className="dark:bg-metal-900 placeholder:text-black/50"
                {...register("password", {
                  required: "Se requiere contraseña",
                })}
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
                className={cn(
                  "button-custom-outline",
                  "text-black",
                  "flex justify-center items-center py-2 px-3 rounded-lg select-none cursor-pointer",
                )}
              >
                {showPassword ? (
                  <EyeSlash size={20} className="w-5 h-5" />
                ) : (
                  <Eye size={20} className="w-5 h-5" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className={cn("button-custom", {
                "pointer-events-none opacity-75 cursor-not-allowed": isLoading,
              })}
            >
              {isLoading ? (
                <div className="flex">
                  Validando
                  <DotAnimation $delay="500ms">.</DotAnimation>
                  <DotAnimation $delay="600ms">.</DotAnimation>
                  <DotAnimation $delay="700ms">.</DotAnimation>
                </div>
              ) : (
                <div>Ingresar</div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

type FormValues = {
  email: string
  password: string
}

export default LoginPage
