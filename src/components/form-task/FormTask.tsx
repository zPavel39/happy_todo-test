'use client'
import { ITaskFormInputs } from '@/type/form'
import { ICategory } from '@/type/task'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ITaskFormProps {
	onSubmit: (data: ITaskFormInputs) => void
	formId: string
	label: string
	categories: ICategory[]
	selected?: number | null
	value?: string
}

const FormTask = ({
	onSubmit,
	formId,
	label,
	categories,
	selected,
	value,
}: ITaskFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ITaskFormInputs>()

	const onSubmitHandler: SubmitHandler<ITaskFormInputs> = data => {
		onSubmit(data)
	}

	return (
		<form
			id={formId}
			onSubmit={handleSubmit(onSubmitHandler)}
			className='flex flex-col gap-4'
		>
			<div>
				<select
					{...register('categoryId', { required: 'Выберите категорию' })}
					className='w-full border border-gray-300 rounded px-3 py-2 text-black'
					defaultValue={selected || ''}
				>
					<option value='' disabled>
						Выберите категорию
					</option>
					{categories.map(category => (
						<option key={category.categoryId} value={category.categoryId}>
							{category.name}
						</option>
					))}
				</select>
				{errors.categoryId && (
					<span className='text-red-500 text-sm'>
						{errors.categoryId.message}
					</span>
				)}
			</div>

			<div>
				<input
					{...register('title', { required: 'Поле обязательно' })}
					className='w-full border border-gray-300 rounded px-3 py-2 text-black'
					placeholder={`Введите 22 ${label}`}
					defaultValue={value || ''}
				/>
				{errors.title && (
					<span className='text-red-500 text-sm'>{errors.title.message}</span>
				)}
			</div>
		</form>
	)
}

export default FormTask
