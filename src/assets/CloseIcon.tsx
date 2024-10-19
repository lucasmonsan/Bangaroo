import { FC } from "react"

interface CloseIconProps {
	stroke?: string
}

export const CloseIcon: FC<CloseIconProps> = ({ stroke = "var(--white)" }) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6 6L18 18M18 6L6 18" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
