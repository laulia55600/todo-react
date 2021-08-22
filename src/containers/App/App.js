import React, {useState} from 'react';
import classes from './App.module.css';
import Task from '../../components/Task/Task';

function App() {

  //states
  const [tasks, setTasks] = useState([]);  
  const [input, setInput] = useState('');

  //Fonctions
  const removedClickedHandler = index => {
    const newsTasks = [...tasks];
    newsTasks.splice(index, 1);
    setTasks(newsTasks);
  }

  const doneClickedHandler = (index, done) => {   
    const newsTasks = [...tasks];
    newsTasks[index].done = !tasks[index].done;
    setTasks(newsTasks);
  }

  const submittedTaskHandler = event => {
    //bloquer l'êvenement par defaut:l'envoi du formulaire 
    event.preventDefault(); 

    const newTask = {
      content: input,
      done: false
    }
    setTasks([...tasks, newTask]);
    setInput('');
  }

  const changedFormHandler = event => {
    setInput(event.target.value);
  }  

  //variables pour lister les taches dynamiquements 
  let tasksDisplayed = tasks.map((task, index) => (
    <Task
    done={task.done}
    content={task.content}
    Key={index}    
    removeClicked={()=> removedClickedHandler(index)}
    doneClicked={()=> doneClickedHandler(index)}
    />
  ));

  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input 
          type="text"
          value={input}
          onChange={(e) => changedFormHandler(e)} 
          placeholder="Que souhaitez-vous ajouter ?" />
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
