import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "../Todolist.module.css";
// import {Button} from "./Button";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

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
    <TextField variant={"outlined"}
           value={title}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
           className={error ? style.error : ""}/>
    <Button size="small"
            variant = "contained"
            color = "primary"
            onClick={addTaskHandler}
            style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>+</Button>
    {error && <div className={style.errorMessage}>{error}</div>}
  </div>
  )
}
