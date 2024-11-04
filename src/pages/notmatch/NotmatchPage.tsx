import { NavLink } from "react-router-dom"

const NotmatchPage = () => {
  return (
    <div className="flex flex-col text-custom">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center p-6 py-10 lg:py-40">
        <h1 className="text-heading-5 font-medium text-metal-700 dark:text-white mb-[14px] mt-5">
          ¡Oops! Página no encontrada.
        </h1>
        <p className="text-center text-body-3 font-normal text-metal-400 dark:text-metal-300 mb-8">
          La página que estás buscando puede haber sido eliminada, su nombre puede haber
          cambiado o no estar disponible temporalmente.
        </p>
        <NavLink
          to={"/"}
          className="disabled:pointer-events-none focus-visible:ring-1 focus-visible:ring-metal-100 disabled:opacity-50 transition-all focus-visible:outline-none inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed capitalize text-body-4 px-4 py-2.5 h-10 font-medium rounded-lg bg-metal-900 hover:bg-metal-800 dark:bg-white dark:hover:bg-metal-25 dark:text-metal-900 text-white disabled:bg-metal-600 dark:disabled:bg-metal-600 dark:disabled:text-white"
        >
          Back to home
        </NavLink>
      </div>
    </div>
  )
}

export default NotmatchPage
