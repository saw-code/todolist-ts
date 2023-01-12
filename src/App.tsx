import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {
  const title = 'November'

  const [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false}
  ])

  const filterTask = (elID: number) => {
    setTasks(tasks.filter(el => el.id !== elID))
  }

  const [select, setSelect] = useState("all")



  const selectButton = (buttonValue: string) => {
    setSelect(buttonValue)
  }

  if(select === "active") {
    setTasks(tasks.filter(el => !el.isDone))
  }

  if(select === "completed") {
    setTasks(tasks.filter(el => el.isDone))
  }

  return (
    <div className="App">
      <Todolist title={title}
                tasks={tasks}
                filterDeleteButton={filterTask}
                filterSelectButton={selectButton}
      />
    </div>
  );
}

export default App;
