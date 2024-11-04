export const getShortName = (name: string): string => {
  const words = name.trim().split(/\s+/)
  if (name.length === 1) {
    return name.toUpperCase()
  }
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  const shortName = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase())
  return shortName.join("")
}
