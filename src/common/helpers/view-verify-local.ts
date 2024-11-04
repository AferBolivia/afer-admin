import { VIEW_TYPE } from "@/enums/view.enum"

export function verifyViewLocal() {
  return localStorage.getItem("view") !== null
}

export function getViewLocal(): VIEW_TYPE | null {
  const view = localStorage.getItem("view")
  if (!view) {
    return null
  }
  return view as VIEW_TYPE
}

export function setViewLocal(view: VIEW_TYPE) {
  localStorage.setItem("view", view)
}

export function removeViewLocal() {
  localStorage.removeItem("auth")
}
