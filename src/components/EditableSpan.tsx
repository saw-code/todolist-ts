import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  value: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewMode = () => {
    setEditMode(false)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return editMode
    ? <input onChange={onChangeHandler} value={title} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{title}</span>
};
