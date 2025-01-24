import {Task} from './App.tsx';
import {Button} from './Button.tsx';

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
}

export const TodolistItem = (
    {   title,
        tasks,
        deleteTask
}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title='+'/>
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
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Completed'/>
            </div>
        </div>
    );
};

