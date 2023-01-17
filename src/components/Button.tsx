import React from 'react';

type PropsType = {
  name: string
  callBack: () => void
}

export function Button(props: PropsType) {
  const onCLickHandler = () => {
    props.callBack()
  }

  return (
      <button onClick={onCLickHandler}>{props.name}</button>
  )
}
