import { FC, MouseEvent, ReactNode } from "react"

interface ButtonProps {
	type?: "button" | "submit" | "reset"
	children: ReactNode
	className?: string
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	style?: Object
}

export const Button: FC<ButtonProps> = ({ type = "button", children, className, style }) => {
	return (
		<button type={type} className={`pointer flex ai-center jc-center padd-xs padd-lr-md border-none ${className}`} style={style}>
			{children}
		</button>
	)
}
