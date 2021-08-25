import React, {useState, useRef, useEffect} from 'react';
import classes from './App.module.css';
import Task from '../../components/Task/Task';
import axios from '../../axios-firebase';

function App() {

  //states
  const [tasks, setTasks] = useState([]);  
  const [input, setInput] = useState('');

  //ref
  const inputRef = useRef('');

  //cycle de vie
  useEffect(() => {
    inputRef.current.focus();

    //axios
    axios.get('/tasks.json')
      .then(response => {
        const tasksArray = [];

        for(let key in response.data) {
          tasksArray.push({
            ...response.data[key],
            id: key
          });
        }

        setTasks(tasksArray);
      })
      .catch(error => {
        console.log(error);
      })    
  },[]);

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

    //axios
    axios.post('/tasks.json', newTask)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });   

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
          ref={inputRef}
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
