import React, {useState} from "react";
import {FilterButtonName} from "./App";

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: number) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {

  let [filterButtonName, setfilterButtonName] = useState<FilterButtonName>('all')

  let durshlag = props.tasks

  if (filterButtonName === 'active') {
    durshlag = props.tasks.filter(el => !el.isDone)
  }

  if (filterButtonName === 'completed') {
    durshlag = props.tasks.filter(el => el.isDone)
  }

  const filteredCurrentTasks = (buttonName: FilterButtonName) => {
    setfilterButtonName(buttonName)
  }

  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {durshlag.map((el, index) => {
            return (
              <li key={el.id}>
                <button onClick={() => props.removeTask(el.id)}>X</button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
              </li>
            )
          })}
        </ul>
        <div>
          <button onClick={() => filteredCurrentTasks('all')}>All</button>
          <button onClick={() => filteredCurrentTasks('active')}>Active</button>
          <button onClick={() => filteredCurrentTasks('completed')}>Completed</button>
        </div>
      </div>
    </div>
  )
}
