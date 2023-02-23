import {v1} from "uuid";
import {TasksType} from "../App";
import {
  addTaskAC, changeStatusAC,
  changeTaskTitleAC, deleteTasksAC,
  newTasksForTodolistAC,
  removeTaskAC,
  tasksReducer
} from "./tasksReducer";

test("task should be removed", () => {
  let todoListID1 = v1()
  let todoListID2 = v1()

  const startState: TasksType = {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

  const removeTaskID = startState[todoListID1][0].id

  const endState = tasksReducer(startState, removeTaskAC(todoListID1, removeTaskID))

  expect(endState[todoListID1].length).toBe(4)
  expect(endState[todoListID1][0].title).toBe("JS")
})

test("task should be added", () => {
  let todoListID1 = v1()
  let todoListID2 = v1()

  const startState: TasksType = {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

  const newTaskTitle = "My new task"

  const endState = tasksReducer(startState, addTaskAC(todoListID1, newTaskTitle))

  expect(endState[todoListID1].length).toBe(6)
  expect(endState[todoListID1][0].title).toBe("My new task")
  expect(endState[todoListID1][0].isDone).toBe(false)
})

test("should change task title", () => {
  let todoListID1 = v1()
  let todoListID2 = v1()

  const startState: TasksType = {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

  const newTaskTitle = "HTML SCUM"
  const changeTaskID = startState[todoListID1][0].id

  const endState = tasksReducer(startState, changeTaskTitleAC(todoListID1, changeTaskID, newTaskTitle))

  expect(endState[todoListID1].length).toBe(5)
  expect(endState[todoListID1][0].title).toBe("HTML SCUM")
  expect(endState[todoListID1][0].isDone).toBe(true)
})

test("should add empty tasks array for todolist", () => {
  let todoListID1 = v1()
  let todoListID2 = v1()

  const startState: TasksType = {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

  const newTodoListID = v1()
  const endState = tasksReducer(startState, newTasksForTodolistAC(newTodoListID))

  expect(endState[newTodoListID].length).toBe(0)
})

test("should change tasks status", () => {
  let todoListID1 = v1()
  let todoListID2 = v1()

  const startState: TasksType = {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

  const taskID = startState[todoListID1][0].id
  const taskStatus = false

  const endState = tasksReducer(startState, changeStatusAC(todoListID1, taskID, taskStatus))

  expect(endState[todoListID1].length).toBe(5)
  expect(endState[todoListID1][0].title).toBe("HTML&CSS")
  expect(endState[todoListID1][0].isDone).toBe(false)
})

test("should delete tasks from todolist if delete todolist", () => {
  let todoListID1 = v1()
  let todoListID2 = v1()

  const startState: TasksType = {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  }

  const endState = tasksReducer(startState, deleteTasksAC(todoListID1))

  expect(endState[todoListID1]).toBe(undefined)
  expect(endState[todoListID2].length).toBe(5)
})
