import { createContext, useEffect, useState, ReactNode } from "react"

type ThemeContextType = {
  theme: "system" | "light" | "dark"
  setTheme: (theme: "system" | "light" | "dark") => void
}

const initialState: ThemeContextType = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeContextType>(initialState)

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: "system" | "light" | "dark"
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "afer-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<"system" | "light" | "dark">(
    () =>
      (localStorage.getItem(storageKey) as "system" | "light" | "dark") || defaultTheme,
  )
  console.log(theme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const setTheme = (newTheme: "system" | "light" | "dark") => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
