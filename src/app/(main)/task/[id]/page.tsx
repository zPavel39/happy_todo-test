'use client'
import Dialog from '@/components/dialog/Dialog'
import FormTask from '@/components/form-task/FormTask'
import Button from '@/components/ui/Button'
import { ICategory, ITask, ITaskData } from '@/type/task'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const TaskDetails = () => {
	const [taskData, setTaskData] = useState<ITaskData[]>([])
	const [taskDetails, setTaskDetails] = useState<ITask | null>(null)
	const [category, setCategory] = useState<ICategory | null>(null)
	const [showTaskForm, setShowTaskForm] = useState(false)
	const [showDeleteTaskForm, setShowDeleteTaskForm] = useState(false)

	const { id } = useParams()
	const navigate = useRouter()

	const editTask = (data: any) => {
		console.log(data)
		setTaskData(prev =>
			prev.map(cat => {
				// удаляем из старой категории
				if (
					cat.id === category?.categoryId &&
					category?.categoryId !== Number(data.categoryId)
				) {
					return {
						...cat,
						tasks: cat.tasks.filter(task => task.id !== taskDetails?.id),
					}
				}

				if (cat.id === Number(data.categoryId)) {
					const searchTask = cat.tasks.find(task => task.id === taskDetails?.id)

					// если есть обновляем
					if (searchTask) {
						return {
							...cat,
							tasks: cat.tasks.map(task =>
								task.id === taskDetails?.id
									? {
											...task,
											title: data.title,
											completed: data.completed ?? false,
									  }
									: task
							),
						}
					}

					// если нет добавляем
					return {
						...cat,
						tasks: [
							...cat.tasks,
							{
								id: taskDetails?.id || Date.now(),
								title: data.title,
								completed: taskDetails?.completed ?? false,
								createdAt: taskDetails?.createdAt || new Date().toISOString(),
							},
						],
					}
				}
				return cat
			})
		)
		setTaskDetails(prev =>
			prev
				? {
						...prev,
						title: data.title,
				  }
				: null
		)
		setCategory({
			name:
				taskData.find(cat => cat.id === Number(data.categoryId))
					?.category_name || '',
			categoryId: Number(data.categoryId),
		})
		setShowTaskForm(false)
	}

	const deleteTask = () => {
		setTaskData(prev =>
			prev.map(cat =>
				cat.id === category?.categoryId
					? {
							...cat,
							tasks: cat.tasks.filter(task => task.id !== taskDetails?.id),
					  }
					: cat
			)
		)
		setTaskDetails(null)
		setCategory(null)
		setShowDeleteTaskForm(false)
		navigate.push('/')
	}

	const handleCompleteTask = () => {
		setTaskData(prev =>
			prev.map(cat =>
				cat.id === category?.categoryId
					? {
							...cat,
							tasks: cat.tasks.map(task =>
								task.id === taskDetails?.id
									? {
											...task,
											completed: !task.completed,
									  }
									: task
							),
					  }
					: cat
			)
		)
		setTaskDetails(prev =>
			prev
				? {
						...prev,
						completed: !prev.completed,
				  }
				: null
		)
	}

	useEffect(() => {
		const storage = localStorage.getItem('taskData')
		if (storage && id) {
			setTaskData(JSON.parse(storage))
			const allTasks: ITaskData[] = JSON.parse(storage)
			for (const category of allTasks) {
				const foundTask = category.tasks.find(task => task.id === Number(id))
				if (foundTask) {
					setTaskDetails(foundTask)
					setCategory({ name: category.category_name, categoryId: category.id })
					break
				}
			}
		}
	}, [id])

	useEffect(() => {
		if (!taskData.length) return
		localStorage.setItem('taskData', JSON.stringify(taskData))
	}, [taskData])

	console.log('category', category)

	return (
		<div className='max-w-[600px] mx-auto '>
			<div className='px-2 py-4 mb-4 flex justify-between'>
				<Button text='Назад' action={() => navigate.back()} />
				<div className='flex gap-2'>
					<Button text='Редактировать' action={() => setShowTaskForm(true)} />
					<Button text='Удалить' action={() => setShowDeleteTaskForm(true)} />
				</div>
			</div>
			<div className='bg-gray-800 px-4 py-3 rounded text-white justify-between flex flex-col gap-1 m-2 mt-20'>
				<div className='flex flex justify-between mb-4'>
					<span
						className={`text-sm font-semibold ${
							taskDetails?.completed ? 'text-green-400' : 'text-yellow-500'
						}`}
					>
						Статус: {taskDetails?.completed ? 'Выполнено' : 'Не выполнено'}
					</span>
					<span className='text-sm text-gray-400'>
						Дата создания:{' '}
						{taskDetails?.createdAt &&
							new Date(taskDetails.createdAt).toLocaleDateString('ru-RU')}
					</span>
				</div>
				<span className='mb-4'>Категория: {category?.name}</span>
				<p>
					Задача: <span className='text-xl'>{taskDetails?.title}</span>
				</p>
				<div className='flex justify-end gap-2'>
					<Button
						text={taskDetails?.completed ? 'Вернуть' : 'Завершить'}
						action={handleCompleteTask}
					/>
				</div>
			</div>
			<Dialog
				formId='taskEditForm'
				isOpen={showTaskForm}
				onClose={() => setShowTaskForm(false)}
				title='Редактировать задачу'
				type='submit'
				children={
					<FormTask
						onSubmit={editTask}
						formId='taskEditForm'
						selected={category?.categoryId}
						value={taskDetails?.title}
						label='Редактировать'
						categories={taskData.map(item => {
							return {
								categoryId: item.id,
								name: item.category_name,
							}
						})}
					/>
				}
			/>

			<Dialog
				isOpen={showDeleteTaskForm}
				onClose={() => setShowDeleteTaskForm(false)}
				title='Удалить задачу ?'
				text='Удалить'
				action={deleteTask}
			/>
		</div>
	)
}

export default TaskDetails
