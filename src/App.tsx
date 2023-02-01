import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  let todoListID1 = v1()
  let todoListID2 = v1()

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
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

  // let [tasks, setTasks] = useState([
  //   {id: v1(), title: "HTML&CSS", isDone: true},
  //   {id: v1(), title: "JS", isDone: true},
  //   {id: v1(), title: "ReactJS", isDone: false},
  //   {id: v1(), title: "Rest API", isDone: false},
  //   {id: v1(), title: "GraphQL", isDone: false},
  // ]);

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
    setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el));
  }

  return (
    <div className="App">
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
        />
      })}
    </div>
  );
}

export default App;
