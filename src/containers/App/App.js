import React, {useState} from 'react';
import classes from './App.module.css';
import Task from '../../components/Task/Task';

function App() {

  //state
  const [taskx, setTasks] = useState([
    {content: 'Aller chercher les courses',
      done: false},
    {content: 'Aller chercher les courses',
      done: false},
    {content: 'Aller chercher les courses',
      done: false},
  ]); 

  //variables pour lister les taches dynamiquements 
  let tasksDisplayed = tasks.map((task, index) => {
    <Task
    done={task.done}
    content={task.content}
    Key={index} 
    />
  });

  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form>
          <input type="text" placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>   
      
      {tasksDisplayed}
    </div>
  );
}

export default App;
