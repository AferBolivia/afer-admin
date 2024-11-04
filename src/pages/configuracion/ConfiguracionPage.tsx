import { SettingsFilled } from "@fluentui/react-icons"
import { Laptop, Moon, Sun } from "@phosphor-icons/react"
import cn from "classnames"
import { Button } from "keep-react"

import { useTheme } from "@/common/hooks/theme.hook"
import Header from "@/components/Header"


const ConfiguracionPage = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex flex-col gap-4 text-custom items-center">
      <Header>
        <div className="flex flex-col items-center justify-center md:flex-row gap-8">
          <h1 className="flex gap-4 text-4xl font-bold">
            <SettingsFilled />
            Configuraciones
          </h1>
        </div>
      </Header>
      <div className="flex flex-col w-full md:w-[400px] gap-4">
        <div className="text-lg font-bold">Tema Actual:</div>
        <div className="flex items-center gap-4">
          {theme === "system" && (
            <>
              <Button className="button-custom-flat" shape="icon" size="2xl">
                <Laptop size={32} />
              </Button>
              <h3 className="flex flex-col text-lg">
                Tema Automatico
                <small className="text-xs">Cambia de forma automatica</small>
              </h3>
            </>
          )}
          {theme === "light" && (
            <>
              <Button className="button-custom-flat" shape="icon" size="2xl">
                <Sun size={32} />
              </Button>
              <h3 className="flex flex-col text-lg">
                Tema Claro
                <small className="text-xs">Para lugares con mucha luz</small>
              </h3>
            </>
          )}
          {theme === "dark" && (
            <>
              <Button className="button-custom-flat" shape="icon" size="2xl">
                <Moon size={32} />
              </Button>
              <h3 className="flex flex-col text-lg">
                Tema Oscuro
                <small className="text-xs">Para lugares con poca luz</small>
              </h3>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[400px] gap-4">
        <div className="text-lg font-bold">Cambiar Tema:</div>
        <div className="flex flex-col gap-4">
          <Button
            size="md"
            onClick={() => setTheme("dark")}
            className={cn(
              "bg-primary-25 text-black dark:bg-metal-800 dark:text-primary-25 hover:bg-primary-25/50 hover:dark:bg-metal-800/50",
              {
                "button-custom": theme == "dark",
              },
            )}
          >
            <Moon className="mr-1.5" />
            Modo Oscuro
          </Button>
          <Button
            size="md"
            onClick={() => setTheme("light")}
            className={cn(
              "bg-primary-25 text-black dark:bg-metal-800 dark:text-primary-25 hover:bg-primary-25/50 hover:dark:bg-metal-800/50",
              {
                "button-custom": theme == "light",
              },
            )}
          >
            <Sun className="mr-1.5" />
            Modo Claro
          </Button>
          <Button
            size="md"
            onClick={() => setTheme("system")}
            className={cn(
              "bg-primary-25 text-black dark:bg-metal-800 dark:text-primary-25 hover:bg-primary-25/50 hover:dark:bg-metal-800/50",
              {
                "button-custom": theme == "system",
              },
            )}
          >
            <Laptop className="mr-1.5" />
            Modo Automatico
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfiguracionPage
