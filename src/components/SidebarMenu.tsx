import React from "react"

import { ArrowExitFilled } from "@fluentui/react-icons"
import {
  Avatar,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarList,
  Drawer,
  DrawerContent,
  AvatarFallback,
} from "keep-react"
import { NavLink, useNavigate } from "react-router-dom"

import UserEnabledToView from "./UserEnabledToView"

import { closeSession } from "@/common/api/auth.api"
import { MenuItem, MenuList } from "@/common/config/menu-list"
import { getShortName } from "@/common/helpers/avatar.helper"
import { useAuth } from "@/common/hooks/auth.hook"
import useMenu from "@/common/hooks/menu.hook"

const SideBarMenu: React.FC<{
  children?: React.ReactNode
  className?: string
}> = (props) => {
  const { auth } = useAuth()
  const user = auth?.user
  return (
    <Sidebar {...props}>
      <SidebarBody>
        <SidebarList>
          {MenuList.map((item: MenuItem, index: number) => (
            <UserEnabledToView key={`menu-item-${index}`} roles={item.access}>
              <SidebarItem className="text-gray-600 dark:text-white/80 p-0 font-workSans font-normal">
                <NavLink to={item.path} className="menu-item">
                  <>
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </>
                </NavLink>
              </SidebarItem>
            </UserEnabledToView>
          ))}
        </SidebarList>
      </SidebarBody>
      <SidebarFooter>
        <NavLink to="/perfil" className="menu-item">
          <Avatar className="dark:text-white/80 before:bg-green-500">
            <AvatarFallback className="!bg-afer-500 !text-white">
              {getShortName(user?.name as string)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-body-4 font-medium text-metal-400 dark:text-white">
              {user?.name || "Usuario"}
            </p>
            <p className="text-body-4 font-normal text-metal-300 dark:text-metal-400">
              {user?.role || "Rol"}
            </p>
          </div>
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  )
}

const SidebarMobile = () => {
  const navigate = useNavigate()
  const { isOpen, closeMenu } = useMenu()
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth(null)
    await closeSession().finally(() => {
      navigate("/login")
    })
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeMenu}>
      <DrawerContent className="text-custom max-w-[300px] overflow-y-auto" position="left">
        <div className="mx-auto w-full">
          <div className="flex justify-between items-center h-20 px-8">
            <h1 className="text-4xl font-bold">Menu</h1>
            <div
              className="border border-black/80 dark:border-white/80 p-2 rounded-md"
              onClick={logout}
            >
              <ArrowExitFilled className="w-5 h-5" />
            </div>
          </div>
          <div onClick={closeMenu}>
            <SideBarMenu className="!h-auto rounded-none shadow-none w-full" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { SideBarMenu, SidebarMobile }
