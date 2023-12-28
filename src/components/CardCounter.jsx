import { useEffect, useState } from "react"

export default function CardCounter() {

  const [totalRecords, setTotalRecords] = useState(0)
  const [totalCompleted, setTotalCompleted] = useState(0)

  useEffect(() => { 
    getTaskCounter()
  }, [])

  const getTaskCounter = async () =>{
    const result = await (await fetch('/api/task')).json()
    setTotalRecords(result.total)
    const completed = result.documents.filter(task=>task.isCompleted)
    setTotalCompleted(completed.length)
  }

  return <div className="border rounded-md py-5 px-5 flex flex-col md:flex-row justify-center items-center text-white">
    <h1 className="font-mono text-2xl md:text-4xl">Tareas realizadas</h1>
    <div className="py-5 px-5 bg-black md:ml-2 rounded-full mt-2 md:mt-0">
      <p>{totalCompleted}/{totalRecords}</p>
    </div>
  </div>
}