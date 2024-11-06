import React, { createContext, useState, ReactNode, useEffect } from "react"

import { getAuthLocal, verifyAuthLocal } from "@/common/helpers/user-verify-local"
import { AuthResponse } from "@/common/interfaces/auth.interface"
import Loader from "@/components/Loader"

export interface AuthContextType {
  auth: AuthResponse | null
  setAuth: (auth: AuthResponse | null) => void
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const verifyLocalData = () => {
    if (verifyAuthLocal()) {
      const userLocal = getAuthLocal()
      setAuth(userLocal)
    }
    setLoading(false)
  }

  useEffect(() => {
    verifyLocalData()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : <>{children}</>}
    </AuthContext.Provider>
  )
}
