import { FC } from "react"

interface SearchIconProps {
	fill?: string
}

export const SearchIcon: FC<SearchIconProps> = ({ fill = "var(--white)" }) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 20L22 22" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
			<path d="M6.75 3.27093C8.14732 2.46262 9.76964 2 11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 9.76964 2.46262 8.14732 3.27093 6.75" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	)
}
