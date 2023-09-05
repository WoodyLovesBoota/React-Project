import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  /* width: 15vw; */
  padding-top: 1vw;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 1vw;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 1vw;
  font-size: 1.5vw;
`;

const Area = styled.div<IDragging>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#fad388" : props.isDraggingFromThis ? "transparent" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 95%;
    border: none;
    border-bottom: 2px solid black;
    background-color: transparent;
    font-size: 1.2vw;
    margin-top: 1vw;
    padding: 3px 0;
    &:focus {
      outline: none;
      border-color: #00b894;
    }
    transition: border-color 0.3s ease-in-out;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IDragging {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((current) => {
      return { ...current, [boardId]: [...current[boardId], newToDo] };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
