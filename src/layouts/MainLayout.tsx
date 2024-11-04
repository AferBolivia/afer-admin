import { ReactNode } from "react"

import NavbarTop from "@/components/NavbarTop"
import { SidebarMobile, SideBarMenu } from "@/components/SidebarMenu"
import { useAuth } from "@/common/hooks/auth.hook"

const MainLayout = ({ children }: MainLayoutProps) => {
  const { auth } = useAuth()
  return (
    <div className="flex flex-col min-h-screen bg-afer-50 dark:bg-black dark:bg-basic-gradient">
      {auth ? (
        <>
          <NavbarTop className="fixed" />
          <div className="w-full mt-20 xl:container overflow-x-hidden min-h-[calc(100vh-80px)] mx-auto bg-white dark:bg-[#121212]">
            <div className="flex overflow-x-auto">
              <div className="w-auto lg:w-[280px] lg:flex-shrink-0">
                <div className="hidden fixed lg:block">
                  <SideBarMenu className="min-h-[calc(100vh-80px)] overflow-y-auto rounded-none" />
                </div>
                <div className="block lg:hidden">
                  <SidebarMobile />
                </div>
              </div>
              <div className="w-full overflow-auto">{children}</div>
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

type MainLayoutProps = {
  children: ReactNode
}

export default MainLayout
