import {FilterValuesType, TodoListsType} from "../App";

export const todoListsReducer = (state: TodoListsType[], {type, payload}: MainType): TodoListsType[] => {
  switch (type) {
    case "REMOVE-TODOLIST": {
      return state.filter(el => el.id !== payload.todoListID)
    }
    case "CHANGE-FILTER": {
      return state.map(el => el.id === payload.todoListID ? {...el, filter: payload.value} : el)
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(el => el.id === payload.todoListID ? {...el, title: payload.newTitle} : el)
    }
    case "ADD-TODOLIST": {
      let newTodolist: TodoListsType = {id: payload.newTodolistId, title: payload.title, filter: "all"}
      return [newTodolist ,...state]
    }
    default:
      return state
  }
}

type MainType = RemoveTodolistACType | ChangeFilterACType | ChangeTodolistTitleACType | AddTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistId: string, title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      newTodolistId,
      title
    }
  } as const
}

export const removeTodolistAC = (todoListID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      todoListID
    }
  } as const
}

export const changeFilterAC = (todoListID: string, value: FilterValuesType) => {
  return {
    type: "CHANGE-FILTER",
    payload: {
      todoListID,
      value
    }
  } as const
}

export const changeTodolistTitleAC = (todoListID: string, newTitle: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      todoListID,
      newTitle
    }
  } as const
}
