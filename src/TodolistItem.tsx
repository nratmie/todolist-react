import {FilterValues, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValues) => void
  createTask: (taskTitle: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filterValue: FilterValues
}

export const TodolistItem = (
    {
      title,
      tasks,
      deleteTask,
      changeFilter,
      createTask,
      changeTaskStatus,
      filterValue
    }: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const createTaskHandler = () => {
      const trimmedTitle = taskTitle.trim()

      if (trimmedTitle !== '') {
        createTask(trimmedTitle)
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
                deleteTask(task.id)
              }

              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(taskId, newStatusValue)
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
            className={filterValue === 'all' ? 'active-filter' : ''}
            title='All'
            onClick={() => changeFilter('all')}/>
          <Button
            className={filterValue === 'active' ? 'active-filter' : ''}
            title='Active'
            onClick={() => changeFilter('active')}/>
          <Button
            className={filterValue === 'completed' ? 'active-filter' : ''}
            title='Completed'
            onClick={() => changeFilter('completed')}/>
        </div>
      </div>
    );
  }
;

