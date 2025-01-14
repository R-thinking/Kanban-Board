// import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Categories, categoryState, toDoSelector } from '../recoil/toDo/atom'
import CreeateToDo from './CreateToDo'
import ToDo from './ToDo'

function ToDoList() {
  /* const [toDo, Doing, Done] = useRecoilValue(toDoSelector) */
  const toDos = useRecoilValue(toDoSelector)
  const [category, setCategory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(+event.currentTarget.value as any)
  }
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreeateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      {/* <div>
        <h2>To Do</h2>
        <ul>
          {toDo.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <h2>Doing</h2>
        <ul>
          {Doing.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <h2>Done</h2>
        <ul>
          {Done.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
        <hr />
      </div> */}
    </div>
  )
}

export default ToDoList
