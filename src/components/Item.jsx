import { useState } from "react"
import { useTask } from "../store/tasksStore"

const Item = ({ todo }) => {

  const [isCompleted, setIsCompleted] = useState(todo.isCompleted)
  const [newTitle, setNewTitle] = useState(todo.title)
  const [wantToEdit, setWantToEdit] = useState(false)

  const deleteTaskStore = useTask(state => state.deleteTaskStore)
  const editTaskStore = useTask(state => state.editTaskStore)

  async function deleteTask() {
    await fetch('/api/task', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({idTask: todo.$id})
    }).then(async(response)=>{
      deleteTaskStore(todo.$id)
    }).catch(error=>console.error(error))
  }

  async function editTask(event) {
    event.preventDefault()
    await fetch('/api/task', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({idTask: todo.$id, newTitle, isCompleted})
    }).then(async(response)=>{
      const result = await response.json()
      editTaskStore(todo.$id, result)
      setWantToEdit(false)
    }).catch(error=>console.error(error))
  }

  async function handleCheckbox(){
    await fetch('/api/task', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({idTask: todo.$id, newTitle: todo.title, isCompleted: !isCompleted})
    }).then(async(response)=>{
      const result = await response.json()
      setIsCompleted(!isCompleted)
      editTaskStore(todo.$id, result)
    }).catch(error=>console.error(error))
  }

  if(wantToEdit){
    return <form className="flex justify-between mt-2">
    <input type="text" className="flex-1 rounded-sm bg-transparent border border-white px-2 py-2 text-white text-lg" value={newTitle} onChange={(event)=>{setNewTitle(event.target.value)}}/>
    <input type="submit" value="Add" onClick={editTask} className="hidden"/>
  </form>
  }

  return <div className="flex justify-between py-2 px-2 rounded-md hover:bg-zinc-900">
    <div className="flex justify-center items-center">
      <div className={`w-3 h-3 mr-2 border rounded-full cursor-pointer ${isCompleted ? 'bg-green-200' : ''}`} onClick={handleCheckbox} />
      <p className={`text-lg text-white ${isCompleted ? 'line-through' : ''}`}>{todo.title}</p>
    </div>
    <div className="flex justify-center items-center">
      <svg
        className={`w-6 cursor-pointer stroke-1	stroke-white ${isCompleted ? 'stroke-green-200' : ''}`}
        width="24px" height="24px" viewBox="0 0 24 24" fill="none" onClick={()=>setWantToEdit(true)}>
        <path d="M12.4445 19.6875H20.9445M14.4443 5.68747L5.44587 14.6859C4.78722 15.3446 4.26719 16.1441 4.10888 17.062C3.94903 17.9888 3.89583 19.139 4.44432 19.6875C4.99281 20.236 6.14299 20.1828 7.0698 20.0229C7.98772 19.8646 8.78722 19.3446 9.44587 18.6859L18.4443 9.68747M14.4443 5.68747C14.4443 5.68747 17.4443 2.68747 19.4443 4.68747C21.4443 6.68747 18.4443 9.68747 18.4443 9.68747M14.4443 5.68747L18.4443 9.68747" />
      </svg>
      <svg 
        className={`w-6 cursor-pointer stroke-1	stroke-white ml-2 ${isCompleted ? 'stroke-green-200' : ''}`} 
        width="24px" height="24px" viewBox="0 0 24 24" fill="none" onClick={deleteTask}>
        <path d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636" />
      </svg>
    </div>
  </div>
}

export default Item