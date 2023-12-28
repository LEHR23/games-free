import { useEffect, useState } from "react"
import Item from "./Item.jsx"

const TaskList = ()=>{

  const [todos, setTodos] = useState([])

  useEffect(()=>{
    getTodos()
  }, [])

  async function getTodos(){
    await fetch('/api/task').then(async(response)=>{
      const result = await response.json()
      setTodos(result.documents)
    }).catch(error=>console.error(error))
  }

  return <>{
    todos.map(function(todo){
      return <Item key={todo.$id} idTask={todo.$id} title={todo.title} completed={todo.isCompleted}/>
    })
  }</>
}

export default TaskList