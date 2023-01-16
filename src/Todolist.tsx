import React from 'react';
import {FilterValuesType} from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: () => void
}

export function Todolist(props: PropsType) {
  return <div>
    <h3>{props.title}</h3>
    <div>
      <input onChange={(e) => console.log()}/>
      <button onClick={() => props.addTask()}>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => <li key={t.id}>
          <button onClick={ () => { props.removeTask(t.id) } }>x</button>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
        </li>)
      }
    </ul>
    <div>
      <button onClick={ () => { props.changeFilter("all") } }>
        All
      </button>
      <button onClick={ () => { props.changeFilter("active") } }>
        Active
      </button>
      <button onClick={ () => { props.changeFilter("completed") } }>
        Completed
      </button>
    </div>
  </div>
}
