import { create } from "zustand"

export const useTask = create((set)=>({
  taskList: [],
  setTaskList: (state)=> set({taskList: state}),
  addNewTaskStore: (newTask) => set((state)=>({taskList: [...state.taskList, newTask]})),
  deleteTaskStore: (idTask) => set((state)=>({taskList: state.taskList.filter(task => task.$id !== idTask)})),
  editTaskStore: (idTask, newTask) => set((state)=>({taskList: state.taskList.map(task =>{
    if(task.$id === idTask){
      task = newTask
    }
    return task
  })})),
}))