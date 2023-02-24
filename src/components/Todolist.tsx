import React, {useState} from 'react';
import {FilterValuesType, TaskType} from '../App';
import style from "../Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import {Delete} from "@mui/icons-material";

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

  const addTask = (title: string) => {
    props.addTask(props.todoListID, title)
  }

  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todoListID, tID)
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

  const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
  const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
  const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

  const mappedTasks = props.tasks.map(t => {

    return (
      <li key={t.id} className={t.isDone ? style.isDone : ""}>
        <IconButton onClick={() => removeTaskHandler(t.id)}>
           <Delete />
        </IconButton>
          <input type="checkbox" checked={t.isDone}
               onChange={(event) => changeStatusHandler(t.id, event.currentTarget.checked)}/>
        <EditableSpan value={t.title} callBack={(newTitle) => changeTitleHandler(t.id, newTitle)}/>
      </li>
    )
  })

  return <div>
    <h3><EditableSpan value={props.title} callBack={changeTodolistHandler}/>
      <IconButton onClick={removeTodolistHandler} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {mappedTasks}
    </ul>
    <div>
      <Button variant={props.filter === 'all'? "outlined" : "text" }
              color="inherit"
              onClick={onAllClickHandler}>All</Button>
      <Button variant={props.filter === 'active'? "outlined" : "text" }
              color="primary"
              onClick={onActiveClickHandler}>Active</Button>
      <Button variant={props.filter === 'completed'? "outlined" : "text" }
              color="secondary"
              onClick={onCompletedClickHandler}>Completed</Button>


      {/*<Button nameFilterButton={nameButton} buttonName={"all"} callBack={() => changeFilterHandler("all")}/>*/}
      {/*<Button nameFilterButton={nameButton} buttonName={"active"} callBack={() => changeFilterHandler("active")}/>*/}
      {/*<Button nameFilterButton={nameButton} buttonName={"completed"} callBack={() => changeFilterHandler("completed")}/>*/}
    </div>
  </div>
}
