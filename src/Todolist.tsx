import React from "react";
import {SelectButtonType} from "./App";

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  filterDeleteButton: (elID: number) => void
  filterSelectButton: (buttonValue: SelectButtonType) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {

  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {props.tasks.map(el => {
            return (
              <li key={el.id}>
                <button onClick={() => props.filterDeleteButton(el.id)}>X</button>
                <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
              </li>
            )
          })}
        </ul>
        <div>
          <button onClick={() => props.filterSelectButton("all")}>All</button>
          <button onClick={() => props.filterSelectButton("active")}>Active</button>
          <button onClick={() => props.filterSelectButton("completed")}>Completed</button>
        </div>
      </div>
    </div>
  )
}
