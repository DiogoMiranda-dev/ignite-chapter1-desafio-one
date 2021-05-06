import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [idExistentes, setIdExistentes] = useState<number[]>([]);

/*   const idExistentes = []; */
  const valorMaximo = 1000;
  
  function GerarIdAleatório() {
      // Escolher um numero ao acaso
      let sugestao: number = Math.ceil(Math.random() * valorMaximo); 
      // Enquanto o numero já existir, escolher outro
      while (idExistentes.indexOf(sugestao) >= 0) {  
          sugestao = Math.ceil(Math.random() * valorMaximo);
      }
      // adicionar este numero à array de números sorteados para futura referência
      setIdExistentes([...idExistentes, sugestao]) 
      // devolver o numero único
      return sugestao; 
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle){
     const novoId =  GerarIdAleatório()
      const newTask = [...tasks, {
        id: novoId,
        title: newTaskTitle,
        isComplete: false,
      }] ;
      setTasks(newTask)
      setNewTaskTitle("")
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
      const newTask = tasks.map(task => {
        if(task.id === id){
          task.isComplete = !task.isComplete
        }
        return task
      })
      setTasks(newTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTask = tasks.filter(task => task.id !== id)
    setTasks(newTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
