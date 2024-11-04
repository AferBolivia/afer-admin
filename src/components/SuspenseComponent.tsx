import { Suspense, ReactNode } from "react"

import LoaderView from "./LoaderView"

const SuspenseComponent = ({ children }: SuspenseComponentProps) => {
  return <Suspense fallback={<LoaderView />}>{children}</Suspense>
}

type SuspenseComponentProps = {
  children: ReactNode
}

export default SuspenseComponent
