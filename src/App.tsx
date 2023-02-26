import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todoListsReducer
} from "./reducers/todoListsReducer";
import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC, deleteTasksAC,
  newTasksForTodolistAC,
  removeTaskAC,
  tasksReducer
} from "./reducers/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: TaskType[]
}

function App() {
  let todoListID1 = v1()
  let todoListID2 = v1()

  let [todoLists, todoListsDispatch] = useReducer(todoListsReducer, [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, tasksDispatch] = useReducer(tasksReducer, {
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
    tasksDispatch(deleteTasksAC(todoListID))
  }

  const changeStatus = (todoListID: string, taskID: string, eventStatus: boolean) => {
    tasksDispatch(changeStatusAC(todoListID, taskID, eventStatus))
  }

  const addTask = (todoListID: string, newTitle: string) => {
    tasksDispatch(addTaskAC(todoListID, newTitle))
  }

  function removeTask(todoListID: string, taskID: string) {
    tasksDispatch(removeTaskAC(todoListID, taskID))
  }

  function changeFilter(todoListID: string, value: FilterValuesType) {
    todoListsDispatch(changeFilterAC(todoListID, value))
  }

  function addTodolist(title: string) {
    let newTodolistId = v1()
    todoListsDispatch(addTodolistAC(newTodolistId, title))
    tasksDispatch(newTasksForTodolistAC(newTodolistId))
  }

  function changeTaskTitle(todoListID: string, tID: string, newTitle: string) {
    tasksDispatch(changeTaskTitleAC(todoListID, tID, newTitle))
  }

  function changeTodolistTitle(todoListID: string, newTitle: string) {
    todoListsDispatch(changeTodolistTitleAC(todoListID, newTitle))
  }

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={12}>

          {todoLists.map(el => {

            let tasksForTodolist = tasks[el.id];

            if (el.filter === "active") {
              tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
            }

            if (el.filter === "completed") {
              tasksForTodolist = tasks[el.id].filter(t => t.isDone);
            }

            return <Grid item>
              <Paper style={{padding: "10px"}}>
                <Todolist
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
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
