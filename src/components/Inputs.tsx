import { ChangeEvent, FC } from "react"

interface InputProps {
	placeholder?: string
	required?: boolean
	type?: string
	autoComplete?: string
	value: string | number | readonly string[]
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	className?: string
}

export const Input: FC<InputProps> = ({ placeholder, value, onChange, className }) => {
	return (
		<label className={`pointer flex column ${className}`} style={{ minWidth: "calc(var(--base) * 10)" }}>
			<input className={`flex ai-center jc-center w-100 border-none bg-none outline-none family-1 fs-md ${className}`} placeholder={placeholder} value={value} onChange={onChange} />
		</label>
	)
}
