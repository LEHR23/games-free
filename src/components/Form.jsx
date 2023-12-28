import { useState } from "react"

const Form = ()=>{

  const [title, setTitel] = useState('')

  async function addTask(event){
    event.preventDefault()
    const result = await (await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({title: title})
    })).json()
    setTitel('')
  }

  return <form className="flex justify-between mt-2">
    <input type="text" className="flex-1 rounded-l-lg" value={title} onChange={(event)=>{setTitel(event.target.value)}}/>
    <input type="submit" value="Add" onClick={addTask} className="p-2 bg-black text-white cursor-pointer rounded-r-lg"/>
  </form>
}

export default Form