import { ReactNode } from "react"

export interface className {
  className?: string
}

export interface container extends className {
  children: ReactNode
}
