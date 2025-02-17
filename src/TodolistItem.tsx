import {FilterValues, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todoId: string, taskId: string) => void
  changeFilter: (todoId: string, filter: FilterValues) => void
  createTask: (todoId: string, taskTitle: string) => void
  changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
}

export const TodolistItem = (
    {
      todolist: {id, title, filter},
      tasks,
      deleteTask,
      changeFilter,
      createTask,
      changeTaskStatus,
    }: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const createTaskHandler = () => {
      const trimmedTitle = taskTitle.trim()

      if (trimmedTitle !== '') {
        createTask(id, trimmedTitle)
        setTaskTitle('')
      } else {
        setError('Title is required')
      }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(e.currentTarget.value)
      setError(null)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        createTaskHandler()
      }
    }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input
            className={error ? 'error' : ''}
            value={taskTitle}
            onChange={changeTaskTitleHandler}
            onKeyDown={createTaskOnEnterHandler}
          />
          <Button title='+' onClick={createTaskHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
        </div>

        {tasks.length === 0
          ? <p>'Тасок нет'</p>
          : <ul>
            {tasks.map((task: Task) => {
              const deleteTaskHandler = () => {
                deleteTask(id, task.id)
              }

              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(id, taskId, newStatusValue)
              }

              return (
                <li
                  key={task.id}
                  className={task.isDone ? 'is-done' : ''}
                >
                  <input
                    type='checkbox'
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatusHandler(e, task.id)}
                  />
                  <span>{task.title}</span>

                  <Button
                    title={'x'}
                    onClick={deleteTaskHandler}
                  />
                </li>
              )
            })}
          </ul>
        }

        <div>
          <Button
            className={filter === 'all' ? 'active-filter' : ''}
            title='All'
            onClick={() => changeFilterHandler('all')}/>
          <Button
            className={filter === 'active' ? 'active-filter' : ''}
            title='Active'
            onClick={() => changeFilterHandler('active')}/>
          <Button
            className={filter === 'completed' ? 'active-filter' : ''}
            title='Completed'
            onClick={() => changeFilterHandler('completed')}/>
        </div>
      </div>
    );
  }
;

