import React, { createContext, useState, ReactNode, useEffect } from "react"

export interface MenuContextType {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  const desktopMediaQuery = window.matchMedia("(min-width: 1024px)")

  useEffect(() => {
    desktopMediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        closeMenu()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MenuContext.Provider value={{ isOpen, openMenu, closeMenu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export { MenuProvider, MenuContext }
