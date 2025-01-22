import {Task} from "./App.tsx";

type Props = {
    title: string
    tasks: Task[]
}

export const TodolistItem = ({title, tasks} : Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((task: Task) => (
                    <li>
                        <input
                            key={task.id}
                            type="checkbox"
                            checked={task.isDone}/>
                        <span>{task.title}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
