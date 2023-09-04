import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#00cec9" : props.theme.cardColor)};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: ${(props) => (props.isDragging ? "0px 4px 5px rgba(0,0,0,0.5)" : "none")};
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
