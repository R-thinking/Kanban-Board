import { Draggable } from '@hello-pangea/dnd'
import React from 'react'
import styled from 'styled-components'
import { IToDo } from '../recoil/toDo/atom'

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  width: 90%;
  height: 80px;
  background-color: ${(props) => (props.isDragging ? '#909090da' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? '0px 5px 5px rgba(0,0,0,0.5)' : 'none')};
`

interface IDragabbleCardProps {
  toDo: IToDo
  index: number
}

const DragabbleCard = ({ toDo, index }: IDragabbleCardProps) => {
  return (
    <Draggable key={toDo.id} draggableId={toDo.text} index={index}>
      {(provided, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDo.text}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DragabbleCard)
