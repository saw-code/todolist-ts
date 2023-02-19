import {TasksType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, {payload, type}: MainType): TasksType => {
  switch (type) {
    case "ADD-TASK": {
      let newTask = {id: v1(), title: payload.newTitle, isDone: false}
      return {...state, [payload.todoListID]: [newTask, ...state[payload.todoListID]]}
    }
    case "REMOVE-TASK": {
      return {...state, [payload.todoListID]: state[payload.todoListID].filter(el => el.id !== payload.taskID)}
    }
    case "CHANGE-TASK-TITLE": {
      return {...state, [payload.todoListID]: state[payload.todoListID].map(el =>
          el.id === payload.tID
            ? {...el, title: payload.newTitle}
            : el)
      }
    }
    case "CHANGE-STATUS": {
      return {...state, [payload.todoListID]: state[payload.todoListID].map(el =>
          el.id === payload.taskID
            ? {...el, isDone: payload.eventStatus}
            : el)
      }
    }
    case "NEW-TASK-FOR-TODOLIST": {
      return {...state, [payload.newTodolistId]: []}
    }
    case "DELETE-TASKS": {
      const stateCopy = {...state}
      delete stateCopy[payload.todoListID]
      return stateCopy
    }
    default:
      return state
  }
}

type MainType = AddTaskACType | RemoveTaskACType | ChangeTaskTitleACType | ChangeStatusACType | newTasksForTodolistACType | DeleteTasksACType
type AddTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type newTasksForTodolistACType = ReturnType<typeof newTasksForTodolistAC>
type DeleteTasksACType = ReturnType<typeof deleteTasksAC>

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

export const deleteTasksAC = (todoListID: string) => {
  return {
    type: "DELETE-TASKS",
    payload: {
      todoListID
    }
  } as const
}


