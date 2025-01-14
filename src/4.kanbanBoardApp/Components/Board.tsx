import { Droppable } from '@hello-pangea/dnd'
import styled from 'styled-components'
import DragabbleCard from './DragabbleCard'
import { useForm } from 'react-hook-form'
import { IToDo, toDoState } from '../recoil/toDo/atom'
import { useSetRecoilState } from 'recoil'

const BoardWrapper = styled.div`
  padding: 15px 0;
  width: 200px;
  min-height: 400px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  border-radius: 5px;
`
interface ICardsWrapper {
  isDraggingOver: boolean
  isDraggingFromThis: boolean
}
const CardsWrapper = styled.div<ICardsWrapper>`
  padding: 10px 0;
  background-color: ${(props) => (props.isDraggingOver ? '#74b9ff' : props.isDraggingFromThis ? '#ff4757' : 'transparent')};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`
const Title = styled.h2`
  text-transform: capitalize;
`
const Form = styled.form``

interface IBoardProps {
  toDos: IToDo[]
  boardId: string
}

interface IForm {
  toDo: string
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState)
  const { register, setValue, handleSubmit } = useForm<IForm>()
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo
    }

    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo]
      }
    })

    setValue('toDo', '')
  }
  return (
    <BoardWrapper>
      <Title> {boardId} </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register('toDo', { required: true })} type='text' placeholder={`Add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <CardsWrapper
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo.id} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </CardsWrapper>
        )}
      </Droppable>
    </BoardWrapper>
  )
}

export default Board
