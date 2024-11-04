import { AferLogo } from "@/assets/branding/AferLogo"

const LoaderView = () => (
  <div className="flex flex-col justify-center items-center min-h-screen w-full">
    <div className="px-8 w-[20rem] pb-24">
      <div className="flex flex-col items-center gap-8 justify-center">
        <AferLogo className="w-24 h-auto dark:text-white" />
        <div className="loader rounded w-44">
          <div className="loader-value"></div>
        </div>
      </div>
    </div>
  </div>
)

export default LoaderView
