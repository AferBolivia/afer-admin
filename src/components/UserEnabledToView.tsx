import { ReactNode } from "react"

import { useAuth } from "@/common/hooks/auth.hook"

const UserEnabledToView = ({ children, roles }: UserEnabledToViewProps) => {
  const { auth } = useAuth()
  const user = auth?.user
  const hasAccess = roles.includes(user?.role || "") || false
  return <>{hasAccess && <>{children}</>}</>
}

type UserEnabledToViewProps = {
  children?: ReactNode
  roles: string[]
}

export default UserEnabledToView
