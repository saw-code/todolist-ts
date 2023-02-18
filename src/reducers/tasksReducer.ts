import {TasksType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: MainType): TasksType => {
  switch (action.type) {
    case "ADD-TASK": {
      let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
      return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
    }
    case "REMOVE-TASK": {
      return {...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)}
    }
    case "CHANGE-TASK-TITLE": {
      return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el =>
          el.id === action.payload.tID
            ? {...el, title: action.payload.newTitle}
            : el)
      }
    }
    case "CHANGE-STATUS": {
      return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el =>
          el.id === action.payload.taskID
            ? {...el, isDone: action.payload.eventStatus}
            : el)
      }
    }
    case "NEW-TASK-FOR-TODOLIST": {
      return {...state, [action.payload.newTodolistId]: []}
    }
    default:
      return state
  }
}

type MainType = AddTaskACType | RemoveTaskACType | ChangeTaskTitleACType | ChangeStatusACType | newTasksForTodolistACType
type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type newTasksForTodolistACType = ReturnType<typeof newTasksForTodolistAC>

export const addTaskAC = (todoListID: string, newTitle: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todoListID,
      newTitle
    }
  } as const
}

export const newTasksForTodolistAC = (newTodolistId: string, title: string) => {
  return {
    type: "NEW-TASK-FOR-TODOLIST",
    payload: {
      newTodolistId,
      title
    }
  } as const
}

export const removeTaskAC = (todoListID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todoListID,
      taskID
    }
  } as const
}

export const changeTaskTitleAC = (todoListID: string, tID: string, newTitle: string) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      todoListID,
      tID,
      newTitle
    }
  } as const
}

export const changeStatusAC = (todoListID: string, taskID: string, eventStatus: boolean) => {
  return {
    type: "CHANGE-STATUS",
    payload: {
      todoListID,
      taskID,
      eventStatus
    }
  } as const
}


