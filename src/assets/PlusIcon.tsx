import { FC } from "react"

interface PlusIconProps {
	stroke?: string
}

export const PlusIcon: FC<PlusIconProps> = ({ stroke = "var(--white)" }) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6 12H18M12 6V18" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
