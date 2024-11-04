import { HomeFilled } from "@fluentui/react-icons"
import { Link } from "react-router-dom"

import { MenuItem, MenuList } from "@/common/config/menu-list"
import Header from "@/components/Header"
import UserEnabledToView from "@/components/UserEnabledToView"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 text-custom min-h-screen items-center bg-white dark:bg-inherit">
      <Header>
        <div className="flex flex-col items-center justify-center md:flex-row gap-8">
          <h1 className="flex gap-4 text-4xl font-bold">
            <HomeFilled strokeWidth={3} />
            Dashboard
          </h1>
        </div>
      </Header>
      <div className="w-full flex flex-col justify-center py-4 px-8">
        <div className="flex items-stretch flex-wrap gap-2 justify-center">
          {MenuList.map((item: MenuItem, index) => (
            <UserEnabledToView key={`item${index}${item.path}`} roles={item.access}>
              <Link
                to={item.path}
                className="group w-32 h-auto flex justify-center items-stretch"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-afer-50 dark:bg-black/30 dark:text-afer-300 w-24 h-24 rounded group-hover:border-2 group-hover:border-solid group-hover:border-white overflow-hidden flex justify-center items-center">
                    <div className="flex justify-center align-center group-hover:scale-110 transition ease-linear duration-300">
                      <item.icon style={{ width: 40, height: 40 }} />
                    </div>
                  </div>
                  <p className="font-workSans font-medium group-hover:text-ww-normal text-ww-lighter text-center text-lg mt-2 leading-6">
                    {item.label}
                  </p>
                </div>
              </Link>
            </UserEnabledToView>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
