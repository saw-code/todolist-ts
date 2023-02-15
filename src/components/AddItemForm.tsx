import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "../Todolist.module.css";
import {Button} from "./Button";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (title.trim() !== "") {
      props.addItem(title)
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

  return (
  <div>
    <input className={error ? style.error : ""}
           value={title}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}/>
    <Button buttonName={"+"} callBack={addTaskHandler}/>
    {error && <div className={style.errorMessage}>{error}</div>}
  </div>
  )
}
