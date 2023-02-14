import React from 'react';
import style from '../Todolist.module.css'

type PropsType = {
  buttonName: string
  callBack: () => void
  nameFilterButton?: string
}

export function Button(props: PropsType) {
  const onCLickHandler = () => {
    props.callBack()
  }

  return (
      <button
        className={props.buttonName === props.nameFilterButton
        ? style.activeFilter
        : "" }
        onClick={onCLickHandler}>
        {props.buttonName}
      </button>
  )
}
