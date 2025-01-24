import {Task} from './App.tsx';
import {Button} from './Button.tsx';

type Props = {
    title: string
    tasks: Task[]
}

export const TodolistItem = ({title, tasks}: Props) => {
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
                                    // key={task.id}
                                    type='checkbox'
                                    checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>)
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

