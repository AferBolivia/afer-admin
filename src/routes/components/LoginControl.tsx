import { lazy } from "react"

import { Navigate } from "react-router-dom"

import { getPathLocal } from "@/common/helpers/path-verify-local"
import { useAuth } from "@/common/hooks/auth.hook"
import SuspenseComponent from "@/components/SuspenseComponent"

const LoginPage = lazy(() => import("@/pages/login/LoginPage"))

export default function LoginControl() {
  const { auth } = useAuth()
  const currentBrowserPath = getPathLocal() || "/"
  console.log(auth, currentBrowserPath)
  return (
    <>
      {auth ? (
        <Navigate to={currentBrowserPath} replace />
      ) : (
        <SuspenseComponent>
          <LoginPage />
        </SuspenseComponent>
      )}
    </>
  )
}
