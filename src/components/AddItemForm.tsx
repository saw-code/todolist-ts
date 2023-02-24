import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';

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

  const buttonSettings = {
    maxWidth: "38px",
    maxHeight: "38px",
    minWidth: "38px",
    minHeight: "38px",
    margin: "5px",
  }

  return (
    <div>
      <TextField variant={"outlined"}
                 value={title}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 error={!!error}
                 label="Title"
                 helperText={error}
      />
      {/*<IconButton color="primary"*/}
      {/*            onClick={addTaskHandler}*/}
      {/*>+</IconButton>*/}
      <Button
        style={buttonSettings}
        onClick={addTaskHandler}
        size="small"
        variant="contained">+</Button>
    </div>
  )
}
