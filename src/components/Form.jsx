import { useState } from "react"
import { useTask } from "../store/tasksStore"
import Alert from "./Alert"

const Form = () => {

  const [title, setTitel] = useState('')
  const [alert, setAlert] = useState(false)

  const addNewTaskStore = useTask(state => state.addNewTaskStore)

  async function addTask(event) {
    event.preventDefault()
    if (title.trim() !== '') {
      const result = await (await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title })
      })).json()
      if (result.$id) {
        setTitel('')
        addNewTaskStore(result)
      }
    } else {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000);
    }
  }

  return <><form className="flex justify-between mt-2">
    <input type="text" maxLength='100' required
      className="flex-1 rounded-l-lg py-2 px-2 text-lg" value={title} onChange={(event) => { setTitel(event.target.value) }} />
    <input type="submit" value="Add" onClick={addTask} className="p-2 bg-black text-white cursor-pointer rounded-r-lg" />
  </form>
    {
      alert && <Alert/>
    }
  </>
}

export default Form