import { ElementType } from "react"

import { Navigate, useLocation } from "react-router-dom"

import { setPathLocal } from "@/common/helpers/path-verify-local"
import { userValidationAccess } from "@/common/helpers/user-validation-access"
import { useAuth } from "@/common/hooks/auth.hook"
import SuspenseComponent from "@/components/SuspenseComponent"

export default function AuthControl({ element: Component }: AuthControlProps) {
  const { auth } = useAuth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to="/login" replace />
  }
  if (!location.pathname?.includes("logout")) {
    setPathLocal(location.pathname)
  }
  const policeAccess = userValidationAccess(location.pathname, auth?.user?.role)
  return (
    <>
      {auth && policeAccess ? (
        <SuspenseComponent>
          <Component />
        </SuspenseComponent>
      ) : (
        <>{auth ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}</>
      )}
    </>
  )
}

type AuthControlProps = {
  element: ElementType
}
