import { FC, MouseEvent, ReactNode } from "react"

interface ButtonProps {
	children: ReactNode
	className?: string
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<ButtonProps> = ({ children, className }) => {
	return <button className={`flex ai-center jc-center padd-xs border-none ${className}`}>{children}</button>
}
