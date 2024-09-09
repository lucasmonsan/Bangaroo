import { FC, ReactNode } from "react"

interface TextProps {
	children: ReactNode
	className?: string
}

export const H1: FC<TextProps> = ({ children, className }) => {
	return <h1 className={`family-1 ${className}`}>{children}</h1>
}

export const H2: FC<TextProps> = ({ children, className }) => {
	return <h2 className={`family-1 ${className}`}>{children}</h2>
}

export const P: FC<TextProps> = ({ children, className }) => {
	return <p className={`family-1 ${className}`}>{children}</p>
}
