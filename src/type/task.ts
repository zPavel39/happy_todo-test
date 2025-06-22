export interface ITaskData {
	id: number
	category_name: string
	tasks: ITask[]
}

export interface ITask {
	id: number
	title: string
	completed: boolean
	createdAt: string
}

export interface ICategory {
	categoryId: number
	name: string
}
