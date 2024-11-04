/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

import { useNavigate } from "react-router"

import { closeSession } from "@/common/api/auth.api"
import { delay } from "@/common/helpers/delay"
import { useAuth } from "@/common/hooks/auth.hook"
import { DotAnimation } from "@/components/DotAnimation"

export default function LogoutPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const logout = async () => {
    await delay(1500)
    setAuth(null)
    await closeSession().finally(() => {
      navigate("/login")
    })
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <div className="flex justify-center items-center w-full pt-16">
      <div className="text-4xl font-workSans font-medium mt-28">
        Cerrando Sesión
        <DotAnimation $delay="500ms">.</DotAnimation>
        <DotAnimation $delay="600ms">.</DotAnimation>
        <DotAnimation $delay="700ms">.</DotAnimation>
      </div>
    </div>
  )
}
