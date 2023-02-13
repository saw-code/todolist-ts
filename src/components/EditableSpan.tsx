import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  value: string
  callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateMode = () => {
    setEditMode(!editMode)
    props.callBack(title)
  }

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return editMode
    ? <input onChange={onChangeTitleHandler} value={title} onBlur={activateMode} autoFocus={true}/>
    : <span onDoubleClick={activateMode}>{props.value}</span>
};
