import { useSetRecoilState } from 'recoil'
import { Categories, IToDo, TCategories, toDoState } from '../recoil/toDo/atom'

const ToDo = ({ text, id, category }: IToDo) => {
  const setToDo = useSetRecoilState(toDoState)

  const onClick = (currCategory: TCategories) => {
    setToDo((prevToDos) =>
      prevToDos.reduce((newToDos: IToDo[], toDo) => {
        newToDos.push(toDo.id === id ? { ...toDo, category: currCategory } : toDo)
        return newToDos
      }, [])
    )
  }
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>}
      {category !== Categories.DOING && <button onClick={() => onClick(Categories.DOING)}>Doing</button>}
      {category !== Categories.DONE && <button onClick={() => onClick(Categories.DONE)}>Done</button>}
    </li>
  )
}

export default ToDo
