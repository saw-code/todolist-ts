import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterButtonName = 'all' | 'active' | 'completed'

function App() {

  let [tasks1, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Redux", isDone: false}
  ])

  const removeTask = (taskID: number) => {
    setTasks(tasks1.filter(el => el.id !== taskID))
  }

  return (
    <div className="App">
      <Todolist
        title='Whats to learn'
        tasks={tasks1}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
