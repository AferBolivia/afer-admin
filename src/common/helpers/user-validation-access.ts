import { ACCESS_CONFIG } from "@/common/config/access"

export function userValidationAccess(pathCurrent: string, userRol: string = "NONE") {
  if (pathCurrent === "/") {
    if (
      ACCESS_CONFIG[userRol as "ADMIN" | "REGISTRADOR" | "NONE"]?.includes(pathCurrent)
    ) {
      return true
    }
    return false
  }
  const pathPartial = deleteLastSlash(pathCurrent)
  const pathReady = replaceLastIfNumber(pathPartial)

  if (ACCESS_CONFIG[userRol as "ADMIN" | "REGISTRADOR" | "NONE"]?.includes(pathReady)) {
    return true
  }
  return false
}

function deleteLastSlash(path: string) {
  const pathValues = path.split("/")
  const lastIndex = pathValues.length - 1
  const lastItem = pathValues[lastIndex]
  if (lastItem === "") {
    pathValues.pop()
  }
  const withoutSlash = pathValues.join("/")
  return withoutSlash
}

function replaceLastIfNumber(path: string) {
  const pathValues = path.split("/")
  const lastIndex = pathValues.length - 1
  const lastItem = pathValues[lastIndex]
  if (!Number.isNaN(+lastItem)) {
    pathValues[lastIndex] = ":id"
  }
  const withReplace = pathValues.join("/")
  return withReplace
}

export default {}
