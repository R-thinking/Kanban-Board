import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, toDoState } from '../recoil/toDo/atom'

interface IForm {
  toDo: string
}

const CreeateToDo = () => {
  const setToDos = useSetRecoilState(toDoState)
  const category = useRecoilValue(categoryState)
  const { register, handleSubmit, setValue } = useForm<IForm>()
  const onValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [{ text: toDo, id: Date.now(), category }, ...prevToDos])
    setValue('toDo', '')
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do'
        })}
        placeholder='Write a to do'
      ></input>
      <button>Add</button>
    </form>
  )
}
export default CreeateToDo
