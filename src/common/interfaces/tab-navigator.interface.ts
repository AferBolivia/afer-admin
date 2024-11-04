export interface ITabNavigationItem {
  title: string
  status: "hold" | "complete" | "blocked"
  active: boolean
}
