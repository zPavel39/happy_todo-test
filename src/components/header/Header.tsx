'use client'
import { GitHubIcon } from '@/assets/icon/GitHubIcon'
import React from 'react'

const Header: React.FC = () => {
	return (
		<header className='flex align-items-center justify-between px-4 py-4'>
			<div className='flex items-end gap-5'>
				<h1 className='text-4xl'>ToDoList</h1>
			</div>
			<a
				className='w-fit cursor-pointer transition duration-300 hover:scale-110'
				href='https://github.com/zPavel39/web-todo-test'
			>
				<GitHubIcon />
			</a>
		</header>
	)
}

export default Header
