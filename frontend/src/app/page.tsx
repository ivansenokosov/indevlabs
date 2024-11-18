'use client'

import { useState, useEffect } from 'react'
import { ITodo, IResponse } from '@/models/todo';
import axios from 'axios'



const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [errMsg, setErrMsg] = useState<string>('')
  const baseUrl = 'http://localhost:4000'

  const loadData = async () => {
    await axios.get<IResponse>(`${baseUrl}/get`).then((response) => {
      console.log(response.data)
      if (response.data.result && response.data.result.todos)
        setTodos(response.data.result.todos)
    })
    setLoading(false)
  }

  const markTodoDone = async (todo: ITodo) => {
    console.log('update', todo.id)
    await axios.put(`${baseUrl}/update/${todo.id}`, {todo: todo.todo, done: !todo.done}).then((response) => {
      console.log(response.data)
      setTodos(todos.map(item => item.id === todo.id ? { ...item, done: !todo.done } : item)); 
    })
  }

  const deleteTodo = async (id: number) => {
    console.log('delete', id)
    await axios.delete(`${baseUrl}/delete/${id}`).then((response) => {
      console.log(response.data)
      setTodos(todos.filter(item => item.id !== id)); 
    })
  }

  const addTodo = async () => {
    await axios.post(`${baseUrl}/create`, {todo: todo, done: false}).then((response) => {
      console.log(response.data.result.id)
      setTodos([{ id: response.data.result.id, todo: todo, done: false }, ...todos]);
      setTodo('');
      setErrMsg('')
    }).catch((error) =>{
      setErrMsg(error.response.data.message)
      console.log(error.response.data.message)
    })
  }


  useEffect(() => {
    loadData()
  },[])

  return (
    <>
      <header className="p-4 bg-indigo-700 text-slate-300">
        <h1 className='text-3xl'>Todo list</h1>
      </header>
      {!loading &&
      <main className="p-4">
        <input 
          type="text" 
          placeholder='Type todo here' 
          className='p-2 rounded mr-5 text-slate-900 bg-slate-200' 
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button className='bg-black text-slate-50 p-2 rounded-lg' onClick={() => addTodo()}
        >Send</button>
        <p className='text-red-500'>{errMsg}</p>
        { todos ? 
          <ul className='mt-5'>
          { 
            todos.map(todo => (
              <li key={todo.id} className={`text-3xl ml-5 cursor-pointer ${ todo.done ? 'line-through' : 'no-underline'}`}>
                {todo.todo}
                
                <button className='ml-5 p-2 rounded-lg text-sm bg-cyan-400' onClick={() => markTodoDone(todo)}> Status </button>
                
                <button className='ml-5 p-2 rounded-lg text-sm bg-red-400' onClick={() => deleteTodo(todo.id)}> Delete </button>
              </li>
            ))
          }
        </ul> 
        : 
        <div>No tasks to display</div>}
      </main>}

    </>
  )
}

export default Home;