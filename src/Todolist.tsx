import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import style from "./Todolist.module.css"
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListID: string, taskID: string) => void
  changeFilter: (todoListID: string, value: FilterValuesType) => void
  addTask: (todoListID: string, newTitle: string) => void
  changeStatus: (todoListID: string, taskID: string, eventStatus: boolean) => void
  filter: FilterValuesType
  removeTodolist: (todoListID: string) => void
}

export function Todolist(props: PropsType) {
  const [nameButton, setNameButton] = useState<FilterValuesType>("all")

  const addTask = (title: string) => {
    props.addTask(props.todoListID, title)
  }

  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todoListID, tID)
  }

  const changeFilterHandler = (nameButton: FilterValuesType) => {
    props.changeFilter(props.todoListID, nameButton)
    setNameButton(nameButton)
  }

  const changeStatusHandler = (tID: string, eventValue: boolean) => {
    props.changeStatus(props.todoListID, tID, eventValue)
  }

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todoListID)
  }

  return <div>

    <h3><EditableSpan value={props.title}/>
      <button onClick={removeTodolistHandler}>X</button>
    </h3>

    <AddItemForm addItem={addTask}/>
    <ul>
      {props.tasks.map(t => {

        return (
          <li key={t.id} className={t.isDone? style.isDone : ""}>
            <Button name={"X"} callBack={() => removeTaskHandler(t.id)}/>
            <input type="checkbox" checked={t.isDone}
                   onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}/>
            <EditableSpan value={t.title}/>
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
