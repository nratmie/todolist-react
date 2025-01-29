import {FilterValues, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {useState} from 'react';

type Props = {
    title: string
    tasks: Task[]
    createTask: (taskTitle: string) => void
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
}

export const TodolistItem = (
    {   title,
        tasks,
        createTask,
        deleteTask,
        changeFilter,
}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
console.log(taskTitle)

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                <Button title='+' onClick={() => createTaskHandler()}/>
            </div>
            {tasks.length === 0
                ? 'Тасок нет'
                : <ul>
                    {tasks.map((task: Task) => {
                        return (
                            <li>
                                <input
                                    key={task.id}
                                    type='checkbox'
                                    checked={task.isDone}/>
                                <span>{task.title}</span>

                                <Button
                                    title={'x'}
                                    onClick={() => deleteTask(task.id)}
                                />
                            </li>
                        )
                    })}
                </ul>
            }

            <div>
                <Button title='All' onClick={() => changeFilter('all')}/>
                <Button title='Active' onClick={() => changeFilter('active')}/>
                <Button title='Completed' onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    );
};

