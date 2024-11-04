import { DotAnimation } from "@/components/DotAnimation"

const LoginLoader = () => {
  return (
    <div className="absolute w-full h-full dark:bg-metal-900 dark:bg-basic-gradient bg-white/40 backdrop-saturate-[1.8] backdrop-blur-lg left-0 z-10 rounded-xl">
      <div className="w-full h-full flex flex-col mt-[13%] items-center gap-8">
        <div className="text-2xl font-workSans font-semibold">
          Ingresando
          <DotAnimation $delay="500ms">.</DotAnimation>
          <DotAnimation $delay="600ms">.</DotAnimation>
          <DotAnimation $delay="700ms">.</DotAnimation>
        </div>
        <div className="loader rounded !w-40">
          <div className="loader-value"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginLoader
