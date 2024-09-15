import { FC, MouseEvent, ReactNode } from "react"

interface ButtonProps {
	type?: "button" | "submit" | "reset"
	children: ReactNode
	className?: string
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<ButtonProps> = ({ type = "button", children, className }) => {
	return (
		<button type={type} className={`flex ai-center jc-center padd-xs padd-lr-md border-none ${className}`}>
			{children}
		</button>
	)
}
