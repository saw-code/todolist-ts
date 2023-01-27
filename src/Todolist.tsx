import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import style from "./Todolist.module.css"

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (newTitle: string) => void
  changeStatus: (taskID: string, eventStatus: boolean) => void
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [nameButton, setNameButton] = useState<FilterValuesType>("all")

  const addTaskHandler = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim())
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return addTaskHandler()
  }

  const removeTaskHandler = (tID: string) => {
    props.removeTask(tID)
  }

  const changeFilterHandler = (nameButton: FilterValuesType) => {
    props.changeFilter(nameButton)
    setNameButton(nameButton)
  }

  const changeStatusHandler = (tID: string, eventValue: boolean) => {
    props.changeStatus(tID, eventValue)
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input className={error ? style.error : ""} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
      <Button name={"+"} callBack={addTaskHandler}/>
    </div>
    {error && <div className={style.errorMessage}>{error}</div>}
    <ul>
      {props.tasks.map(t => {

        // const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //   props.changeStatus(t.id, event.currentTarget.checked)
        // }

        return (
          <li key={t.id} className={t.isDone? style.isDone : ""}>
            <Button name={"X"} callBack={() => removeTaskHandler(t.id)}/>
            <input type="checkbox" checked={t.isDone}
                   onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}/>
            <span>{t.title}</span>
          </li>
        )
      })
      }
    </ul>
    <div>
      <Button nameButton={nameButton} name={"all"} callBack={() => changeFilterHandler("all")}/>
      <Button nameButton={nameButton} name={"active"} callBack={() => changeFilterHandler("active")}/>
      <Button nameButton={nameButton} name={"completed"} callBack={() => changeFilterHandler("completed")}/>
    </div>
  </div>
}




