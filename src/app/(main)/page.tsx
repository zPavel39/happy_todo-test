'use client'

import { FilterIcon } from '@/assets/icon/FilterIcon'
import { KanbanTableIcon } from '@/assets/icon/KanbanIcon'
import { ListTableIcon } from '@/assets/icon/ListTableIcon'
import Dialog from '@/components/dialog/Dialog'
import Header from '@/components/header/Header'
import Button from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import { ITaskData } from '@/type/task'
import FormTask from '@/components/form-task/FormTask'
import FormCategory from '@/components/form-category/FormCategory'
import TaskList from '@/components/task-list/TaskList'
import { ArrowSort } from '@/assets/icon/ArrowSort'
import { ArrowSortDown } from '@/assets/icon/ArrowSortDown'

export default function Home() {
	const [showTaskForm, setShowTaskForm] = useState(false)
	const [showCategoryForm, setShowCategoryForm] = useState(false)
	const [taskData, setTaskData] = useState<ITaskData[]>([])
	const [selectSort, setSelectSort] = useState<{
		key: string
		order: 'asc' | 'desc'
	}>({
		key: '',
		order: 'desc',
	})
	const [selectView, setSelectView] = useState<'kanban' | 'list'>('list')

	const handleCreateTask = (data: any) => {
		setTaskData(prev =>
			prev.map(el =>
				el.id === Number(data.categoryId)
					? {
							...el,
							tasks: [
								...el.tasks,
								{
									id: +Date.now(),
									title: data.title,
									completed: false,
									createdAt: new Date().toISOString(),
								},
							],
					  }
					: el
			)
		)
		setShowTaskForm(false)
	}

	console.log(selectSort)

	const handleCreateCategory = (data: any) => {
		setTaskData(prev => [
			...prev,
			{ id: +Date.now(), category_name: data.title, tasks: [] },
		])
		setShowCategoryForm(false)
	}

	useEffect(() => {
		const storage = localStorage.getItem('taskData')
		if (storage) {
			setTaskData(JSON.parse(storage))
		}
	}, [])

	useEffect(() => {
		if (!taskData.length) return
		localStorage.setItem('taskData', JSON.stringify(taskData))
	}, [taskData])

	console.log(taskData)
	return (
		<div className='overflow-hidden'>
			<Header />
			<div className='flex flex-wrap gap-2 justify-between px-4 mb-4'>
				<div className='flex gap-2'>
					<Button
						icon={<ListTableIcon />}
						action={() => setSelectView('list')}
						active={selectView === 'list'}
					/>
					<Button
						icon={<KanbanTableIcon />}
						action={() => setSelectView('kanban')}
						active={selectView === 'kanban'}
					/>
					{selectView === 'list' && (
						<>
							<Button
								icon={
									selectSort.order === 'asc' && selectSort.key === 'date' ? (
										<ArrowSort />
									) : (
										<ArrowSortDown />
									)
								}
								text='Дата'
								action={() =>
									setSelectSort({
										key: 'date',
										order: selectSort.order === 'asc' ? 'desc' : 'asc',
									})
								}
								active={selectSort.key === 'date'}
							/>

							<Button
								icon={
									selectSort.order === 'asc' && selectSort.key === 'abc' ? (
										<ArrowSort />
									) : (
										<ArrowSortDown />
									)
								}
								text='A-Я'
								action={() =>
									setSelectSort({
										key: 'abc',
										order: selectSort.order === 'asc' ? 'desc' : 'asc',
									})
								}
								active={selectSort.key === 'abc'}
							/>

							<Button
								icon={
									selectSort.order === 'asc' && selectSort.key === 'status' ? (
										<ArrowSort />
									) : (
										<ArrowSortDown />
									)
								}
								text='Статус'
								action={() =>
									setSelectSort({
										key: 'status',
										order: selectSort.order === 'asc' ? 'desc' : 'asc',
									})
								}
								active={selectSort.key === 'status'}
							/>
						</>
					)}
				</div>
				<div className='flex gap-2'>
					<Button text='+ Категорию' action={() => setShowCategoryForm(true)} />
					{taskData.length > 0 && (
						<Button text='+ Задачу' action={() => setShowTaskForm(true)} />
					)}
				</div>
			</div>
			{selectView === 'list' && (
				<div className='max-w-[1200px] mx-auto'>
					<TaskList taskData={taskData} />
				</div>
			)}

			<Dialog
				isOpen={showTaskForm}
				onClose={() => setShowTaskForm(false)}
				title='Добавить задачу'
				formId='taskForm'
				type='submit'
				children={
					<FormTask
						label='заголовок'
						onSubmit={handleCreateTask}
						formId='taskForm'
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
				isOpen={showCategoryForm}
				onClose={() => setShowCategoryForm(false)}
				title='Добавить категорию'
				formId='categoryForm'
				type='submit'
				children={
					<FormCategory
						label='название категории'
						onSubmit={handleCreateCategory}
						formId='categoryForm'
					/>
				}
			/>
		</div>
	)
}
