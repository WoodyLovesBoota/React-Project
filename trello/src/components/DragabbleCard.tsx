import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#aff0ef" : props.theme.cardColor)};
  font-weight: 550;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 11px;
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.2);
`;

interface IDragableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DragabbleCard = ({ toDoId, toDoText, index }: IDragableCardProps) => {
  return (
    <Draggable key={toDoText} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
