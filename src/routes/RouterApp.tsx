import { ToastWrapper } from "keep-react"
import { BrowserRouter } from "react-router-dom"

import RouterList from "./RouterList"

import { ToastOptions } from "@/common/config/toast"
import { AuthProvider } from "@/common/contexts/auth.context"
import { MenuProvider } from "@/common/contexts/menu.context"
import { ThemeProvider } from "@/common/contexts/theme.context"
import { ViewProvider } from "@/common/contexts/view.context"
import MainLayout from "@/layouts/MainLayout"

const RouterApp = () => (
  <BrowserRouter>
    <ToastWrapper richColors position="top-right" toastOptions={ToastOptions} closeButton />
    <AuthProvider>
      <ViewProvider>
        <ThemeProvider defaultTheme="light">
          <MenuProvider>
            <MainLayout>
              <RouterList />
            </MainLayout>
          </MenuProvider>
        </ThemeProvider>
      </ViewProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default RouterApp
