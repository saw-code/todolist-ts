import {TasksType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: MainType): TasksType => {
  switch (action.type) {
    case "ADD-TASK": {
      let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
      return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
    }
    default:
      return state
  }
}

type MainType = AddTaskACType
type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todoListID: string, newTitle: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todoListID,
      newTitle
    }
  } as const
}