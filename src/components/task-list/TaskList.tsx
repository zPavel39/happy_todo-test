'use client'
import { ITaskData } from '@/type/task'
import Link from 'next/link'

interface TaskBoardProps {
	taskData: ITaskData[]
	onEditTask?: (categoryId: number, taskId: number) => void
}

const TaskList = ({ taskData, onEditTask }: TaskBoardProps) => {
	if (!taskData.length) return <p className='text-white p-4'>Нет категорий</p>

	return (
		<div className='flex flex-col overflow-x-auto gap-6 p-4'>
			{taskData.map(category => (
				<div
					key={category.id}
					className='min-w-[300px] bg-[#1a1a1a] rounded-xl p-3 shadow border border-gray-700 flex-shrink-0'
				>
					<h2 className='text-xl font-bold text-white mb-4'>
						{category.category_name}
					</h2>

					{category.tasks.length > 0 ? (
						<ul className='flex flex-col gap-2'>
							{category.tasks.map(task => (
								<li
									key={task.id}
									className='bg-gray-800 px-4 py-3 rounded text-white justify-between grid grid-cols-3 gap-1'
								>
									<div className='flex flex-col col-span-2'>
										<span className='text-sm text-gray-400'>
											Дата:{' '}
											{new Date(task.createdAt).toLocaleDateString('ru-RU')}
										</span>
										<span className='text-base font-medium'>{task.title}</span>
									</div>
									<div className='flex items-end flex-col'>
										<span
											className={`text-sm font-semibold ${
												task.completed ? 'text-green-400' : 'text-yellow-500'
											}`}
										>
											{task.completed ? 'Завершена' : 'Активна'}
										</span>
										<Link
											className='mt-2 text-sm text-blue-500 hover:underline'
											href={`/task/${task.id}`}
										>
											Подробнее
										</Link>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className='text-sm text-gray-400'>Нет задач</p>
					)}
				</div>
			))}
		</div>
	)
}

export default TaskList
