import { AferLogo } from "@/assets/branding/AferLogo"

const Loader = () => (
  <div className="flex flex-col justify-center items-center w-full min-h-screen bg-white dark:bg-black">
    <div className="px-8 w-[20rem] pb-24">
      <div className="flex flex-col items-center gap-8 justify-center">
        <AferLogo className="w-24 h-auto text-black/80 dark:text-white" />
        <div className="loader rounded w-44">
          <div className="loader-value"></div>
        </div>
      </div>
    </div>
  </div>
)

export default Loader
