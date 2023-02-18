import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todoListsReducer
} from "./reducers/todoListsReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksType = {
  [key: string]: TaskType[]
}

function App() {
  let todoListID1 = v1()
  let todoListID2 = v1()

  let [todoLists, todoListsDispatch] = useReducer(todoListsReducer, [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksType>({
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
  });

const removeTodolist = (todoListID: string) => {
  todoListsDispatch(removeTodolistAC(todoListID))
  delete tasks[todoListID]
}

  const changeStatus = (todoListID: string, taskID: string, eventStatus: boolean) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].map(el =>
        el.id === taskID
          ? {...el, isDone: eventStatus}
          : el)
    })
  }

  const addTask = (todoListID: string, newTitle: string) => {
    let newTask = {id: v1(), title: newTitle, isDone: false}
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }

  function removeTask(todoListID: string, taskID: string) {
    setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
  }

  function changeFilter(todoListID: string, value: FilterValuesType) {
    todoListsDispatch(changeFilterAC(todoListID, value))
}

  function addTodolist(title: string) {
    let newTodolistId = v1()
    let newTodolist: TodoListsType = {id: newTodolistId, title: title, filter: "all"}
    setTodoLists([newTodolist ,...todoLists])
    setTasks({...tasks, [newTodolistId]: []})
  }

  function changeTaskTitle(todoListID: string, tID: string, newTitle: string) {
    setTasks({...tasks, [todoListID]: tasks[todoListID].map(el =>
        el.id === tID
          ? {...el, title: newTitle}
          : el)
    })
  }

  function changeTodolistTitle(todoListID: string, newTitle: string) {
    todoListsDispatch(changeTodolistTitleAC(todoListID, newTitle))
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>

      {todoLists.map(el => {

        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
          tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
        }

        if (el.filter === "completed") {
          tasksForTodolist = tasks[el.id].filter(t => t.isDone);
        }

        return <Todolist
          key={el.id}
          todoListID={el.id}
          title={el.title}
          tasks={tasksForTodolist}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeStatus={changeStatus}
          filter={el.filter}
          removeTodolist={removeTodolist}
          changeTaskTitle={changeTaskTitle}
          changeTodolistTitle={changeTodolistTitle}
        />
      })}
    </div>
  );
}

export default App;
