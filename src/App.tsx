import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from 'react';
import {v1} from 'uuid';

export type Todolist = {
  id: string;
  title: string;
  filter: string;
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type TasksState = {
  [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  // BLL
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  })

  const deleteTask = (todoId: string, taskId: string) => {
    const newTasks = {
      ...tasks,
      [todoId]: tasks[todoId].filter(task => task.id !== taskId)
    }
    setTasks(newTasks)
  }

  const changeFilter = (todoId: string, filter: FilterValues) => {
    setTodolists(todolists.map(todo => todo.id === todoId
      ? {...todo, filter}
      : todo))
  }

  const createTask = (todoId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    setTasks({...tasks, [todoId]: [...tasks[todoId], newTask]})
  }

  const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
    const newState = {
      ...tasks,
      [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, isDone} : task)
    }
    setTasks(newState)
  }

  const deleteTodolist = (todoId: string) => {
    setTodolists(todolists.filter(todo => todo.id !== todoId))
    delete tasks[todoId]
    setTasks({...tasks})
  }

// UI
  return (
    <div className="app">
      {todolists.map(todo => {
          let filteredTasks = tasks[todo.id]
          if (todo.filter === 'active') {
            filteredTasks = tasks[todo.id].filter(task => !task.isDone)
          }
          if (todo.filter === 'completed') {
            filteredTasks = tasks[todo.id].filter(task => task.isDone)
          }

          return (
            <TodolistItem
              key={todo.id}
              todolist={todo}
              tasks={filteredTasks}
              deleteTask={deleteTask}
              changeFilter={changeFilter}
              createTask={createTask}
              changeTaskStatus={changeTaskStatus}
              deleteTodolist={deleteTodolist}
            />
          )
        }
      )}
    </div>
  )
}


