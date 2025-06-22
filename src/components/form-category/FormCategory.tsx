'use client'
import { ICategoryFormInputs } from '@/type/form'
import { useForm, SubmitHandler } from 'react-hook-form'

interface ICategoryFormProps {
	onSubmit: (data: ICategoryFormInputs) => void
	formId: string
	label: string
}

const FormCategory = ({ onSubmit, formId, label }: ICategoryFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICategoryFormInputs>()

	const onSubmitHandler: SubmitHandler<ICategoryFormInputs> = data => {
		onSubmit(data)
	}

	return (
		<form
			id={formId}
			onSubmit={handleSubmit(onSubmitHandler)}
			className='flex flex-col gap-4'
		>
			<div>
				<input
					{...register('title', { required: 'Поле обязательно' })}
					className='w-full border border-gray-300 rounded px-3 py-2 text-black'
					placeholder={`Введите ${label}`}
				/>
				{errors.title && (
					<span className='text-red-500 text-sm'>{errors.title.message}</span>
				)}
			</div>
		</form>
	)
}

export default FormCategory
