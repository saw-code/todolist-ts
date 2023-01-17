import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
  addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("")

  const addTaskHandler = () => {
    props.addTask(title)
    setTitle("")
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") return addTaskHandler()
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
      <button onClick={addTaskHandler}>+</button>
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
