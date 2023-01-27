import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { CgAdd } from 'react-icons/cg';
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      descriptiom: newDescription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setAllTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr));
  }

  const handleDeleteTodo = (index) => {
    let reducedtodo = [...allTodos];
    reducedtodo.splice(index);

    localStorage.setItem('todolist', JSON.stringify(reducedtodo));
    setAllTodos(reducedtodo);
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedtodo = [...completedTodos];
    reducedtodo.splice(index);

    localStorage.setItem('completedTodos', JSON.stringify(reducedtodo));
    setCompletedTodos(reducedtodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completeOn = dd + '-' + mm + '-' + yyyy + ' a las ' + h + ':' + m + ':' + s;


    let filteredItem = {
      ...allTodos[index],
      completeOn: completeOn
    }

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr));
  }



  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>Mis Tareas</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>

          <div className='todo-input-item'>
            <label>Titulo</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Cual es el titulo de la tarea?' />
          </div>

          <div className='todo-input-item'>
            <label>Descripcion</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Cual es la descripcion de la tarea?' />
          </div>

          <div className='todo-input-item'>
            <button type="button" onClick={handleAddTodo} className='primaryBtn'> <CgAdd className='icon-add'/> </button>
          </div>

        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completo</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen === false && allTodos.map((item, index) => {

            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.descriptiom}</p>
                </div>

                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Eliminar' />
                  <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} title='Completada' />
                </div>
              </div>
            )

          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {

            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.descriptiom}</p>
                  <p><small>Completado el: {item.completeOn}</small></p>
                </div>

                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='Eliminar' />
                </div>
              </div>
            )

          })}

        </div>

      </div>
    </div>
  );
}

export default App;
