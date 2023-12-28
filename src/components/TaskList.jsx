import { useEffect } from "react"
import Item from "./Item.jsx"
import { useTask } from "../store/tasksStore.js"

const TaskList = ()=>{

  const {taskList, setTaskList } = useTask(state => state)

  useEffect(()=>{
    getTodos()
  }, [])

  async function getTodos(){
    await fetch('/api/task').then(async(response)=>{
      const result = await response.json()
      setTaskList(result.documents)
    }).catch(error=>console.error(error))
  }

  return <>{
    taskList.map(function(todo){
      return <Item key={todo.$id} todo={todo}/>
    })
  }</>
}

export default TaskList