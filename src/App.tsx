import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export const App = () => {
  return (
      <div className="app">
          <TodolistItem title="What to learn"/>
          <TodolistItem title="Songs"/>
          <TodolistItem title="Dances"/>
      </div>
  )
}