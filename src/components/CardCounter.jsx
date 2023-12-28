import { useEffect, useState } from "react"
import { useTask } from "../store/tasksStore.js"

export default function CardCounter() {

  const [totalRecords, setTotalRecords] = useState(0)
  const [totalCompleted, setTotalCompleted] = useState(0)

  const taskList = useTask(state => state.taskList)

  useEffect(() => { 
    getTaskCounter()
  }, [taskList])

  const getTaskCounter = async () =>{
    setTotalRecords(taskList.length)
    const completed = taskList.filter(task=>task.isCompleted)
    setTotalCompleted(completed.length)
  }

  return <div className="border rounded-md py-5 px-5 flex flex-col md:flex-row justify-center items-center text-white">
    <h1 className="font-mono text-2xl md:text-4xl">Tareas realizadas</h1>
    <div className="py-5 px-5 bg-black md:ml-2 rounded-full mt-2 md:mt-0">
      <p>{totalCompleted}/{totalRecords}</p>
    </div>
  </div>
}