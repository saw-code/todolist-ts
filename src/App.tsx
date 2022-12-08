import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
  const title1 = 'November'
  const title2 = 'December'

  const tasks1: Array<TaskType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ]
  const tasks2: Array<TaskType> = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]

  return (
    <div className="App">
      <Todolist title={title1} tasks={tasks1}/>
      <Todolist title={title2} tasks={tasks2}/>
    </div>
  );
}

export default App;
