import { List } from "@phosphor-icons/react"
import cn from "classnames"
import { Navbar, NavbarBrand, NavbarItem, NavbarList } from "keep-react"
import { useNavigate } from "react-router"

import { AferLogo } from "@/assets/branding/AferLogo"
import { closeSession } from "@/common/api/auth.api"
import { useAuth } from "@/common/hooks/auth.hook"
import useMenu from "@/common/hooks/menu.hook"

const NavbarTop = ({ className = "" }: NavbarTopProps) => {
  const navigate = useNavigate()
  const { openMenu } = useMenu()
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth(null)
    await closeSession().finally(() => {
      navigate("/login")
    })
  }

  return (
    <Navbar className="fixed w-full top-0 left-0 z-50 h-[80px] flex items-center justify-center">
      <div
        className={cn(
          "w-full flex xl:container lg:mx-auto px-4 sm:px-8 justify-between",
          className,
        )}
      >
        <NavbarBrand className="flex justify-center items-center gap-4">
          <div
            className="text-custom block lg:hidden border border-black/80 dark:border-white/80 p-2 rounded-md"
            onClick={openMenu}
          >
            <List size={20} weight="bold" />
          </div>
          <AferLogo className="w-10 h-auto dark:text-white " />
          <h3 className="text-body-2 dark:text-white font-workSans font-semibold">Control</h3>
        </NavbarBrand>
        <NavbarList>
          <NavbarItem active onClick={logout} className="button-custom select-none flex gap-2">
            Cerrar Sesión
          </NavbarItem>
        </NavbarList>
      </div>
    </Navbar>
  )
}

type NavbarTopProps = {
  className?: string
}

export default NavbarTop
