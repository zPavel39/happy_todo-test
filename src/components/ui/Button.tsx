'use client'
import { ReactNode } from 'react'

interface IPropsButton {
	text?: string
	icon?: ReactNode
	form?: string
	action: () => void
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	active?: boolean
}

const Button = ({
	text,
	icon,
	action,
	type = 'button',
	form,
	disabled = false,
	active = false,
}: IPropsButton) => {
	return (
		<button
			className={`py-1 px-2 rounded-md flex items-center gap-1 transition duration-300 
				${
					active
						? 'bg-teal-600 text-white'
						: 'bg-white text-teal-600 hover:bg-gray-200'
				}
				${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
			`}
			type={type}
			form={form}
			disabled={disabled}
			onClick={() => action()}
		>
			{icon && <span>{icon}</span>}
			<span className='text-lg'>{text}</span>
		</button>
	)
}

export default Button
