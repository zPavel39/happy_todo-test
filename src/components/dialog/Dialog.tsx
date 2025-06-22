'use client'
import React, { ReactNode } from 'react'
import Button from '../ui/Button'

interface IDialogProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children?: ReactNode
	formId?: string
	type?: 'button' | 'submit'
	action?: () => void
	text?: string
}

const Dialog = ({
	isOpen,
	onClose,
	title,
	children,
	formId,
	type = 'button',
	text = 'Сохранить',
	action,
}: IDialogProps) => {
	if (!isOpen) return null
	return (
		<div
			className='fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-50'
			onClick={onClose}
		>
			<div
				className='bg-white p-4 rounded-md max-w-md w-full'
				onClick={e => e.stopPropagation()}
			>
				{title && (
					<h2 className='text-2xl font-semibold mb-4 text-black'>{title}</h2>
				)}
				<div className='mb-4'>{children}</div>
				<div className='flex justify-end gap-2'>
					0
					<Button text='Закрыть' action={onClose} />
					<Button
						text={text}
						type={type}
						form={formId}
						action={action ? action : () => {}}
					/>
				</div>
			</div>
		</div>
	)
}

export default Dialog
