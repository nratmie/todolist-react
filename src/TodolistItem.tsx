import {FilterValues, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {useRef} from 'react';

type Props = {
    title: string
    tasks: Task[]
    createTask: (title: string) => void
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
    const inputRef = useRef<HTMLInputElement>(null)

    // useref
    const onSetTitle = () => {
        if (inputRef.current) {
            createTask(inputRef.current.value)
            inputRef.current.value = ''
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef}/> {/*// useref*/}
                <Button title='+' onClick={onSetTitle}/>
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

