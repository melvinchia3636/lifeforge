interface IRoutesItem {
  name: string
  icon: string
  routes: Record<string, string>
  provider?: string
  subsection?: string[][]
  togglable: boolean
  hasAI?: boolean
  hidden?: boolean
  requiredAPIKeys?: string[]
}

export interface IRoutes {
  title: string
  prefix?: string
  items: IRoutesItem[]
}
