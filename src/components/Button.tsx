import React from 'react';
import style from '../Todolist.module.css'

type PropsType = {
  name: string
  callBack: () => void
  nameButton?: string
}

export function Button(props: PropsType) {
  const onCLickHandler = () => {
    props.callBack()
  }

  return (
      <button
        className={props.name === props.nameButton
        ? style.activeFilter
        : "" }
        onClick={onCLickHandler}>
        {props.name}
      </button>
  )
}
