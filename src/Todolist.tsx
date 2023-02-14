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
  changeTaskTitle: (todoListID: string, tID: string, newTitle: string) => void
  changeTodolistTitle: (todoListID: string, newTitle: string) => void
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

  const changeTitleHandler = (tID: string, newTitle: string) => {
    props.changeTaskTitle(props.todoListID, tID, newTitle)
  }

  const changeTodolistHandler = (newTitle: string) => {
    props.changeTodolistTitle(props.todoListID, newTitle)
  }

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todoListID)
  }

  const mappedTasks = props.tasks.map(t => {

    return (
      <li key={t.id} className={t.isDone ? style.isDone : ""}>
        <Button buttonName={"X"} callBack={() => removeTaskHandler(t.id)}/>
        <input type="checkbox" checked={t.isDone}
               onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}/>
        <EditableSpan value={t.title} callBack={(newTitle) => changeTitleHandler(t.id, newTitle)}/>
      </li>
    )
  })

  return <div>
    <h3><EditableSpan value={props.title} callBack={changeTodolistHandler}/>
      <button onClick={removeTodolistHandler}>X</button>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {mappedTasks}
    </ul>
    <div>
      <Button nameFilterButton={nameButton} buttonName={"all"} callBack={() => changeFilterHandler("all")}/>
      <Button nameFilterButton={nameButton} buttonName={"active"} callBack={() => changeFilterHandler("active")}/>
      <Button nameFilterButton={nameButton} buttonName={"completed"} callBack={() => changeFilterHandler("completed")}/>
    </div>
  </div>
}
