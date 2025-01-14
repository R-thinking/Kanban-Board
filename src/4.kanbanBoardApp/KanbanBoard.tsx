import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { toDoState } from './recoil/toDo/atom'
import Board from './Components/Board'

const Wrapper = styled.div`
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 10px;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

const KanbanBoard = () => {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return

    if (source.droppableId === destination.droppableId) {
      // movement in the same board
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const modifiedBoard = sourceBoard.toSpliced(source.index, 1).toSpliced(destination.index, 0, sourceBoard[source.index])
        return { ...allBoards, [source.droppableId]: modifiedBoard }
      })
    } else {
      //movement to the other board
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const modifiedBoard = sourceBoard.toSpliced(source.index, 1)
        const destBoard = [...allBoards[destination.droppableId].toSpliced(destination.index, 0, sourceBoard[source.index])]
        return { ...allBoards, [source.droppableId]: modifiedBoard, [destination.droppableId]: destBoard }
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default KanbanBoard
