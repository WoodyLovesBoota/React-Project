import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div<IWrapper>`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  width: 303px;
  min-height: 180px;
  margin-right: 20px;
  padding: 23px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.boardId === "TrashLILI" && "transparent"};
  box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.2);
  * :not(Area) {
    display: ${(props) => props.boardId === "TrashLILI" && "none"};
  }
  Form {
    border: ${(props) => props.boardId === "TrashLILI" && "none"};
  }

  ${(props) =>
    props.boardId === "TrashLILI" && {
      width: "140px",
      minHeight: "160px",
      position: "fixed",
      top: "-40px",
      right: 0,
      boxShadow: "none",
      padding: 0,
      margin: 0,
      borderBottomLeftRadius: "140px",
      backgroundColor: props.theme.accentColor,
    }}
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 800;
  font-size: 21px;
`;

const Area = styled.div<IDragging>`
  background-color: ${(props) => props.isDraggingOver && "#fad388"};
  transition: background-color 0.5s ease-in-out;
  min-height: 160px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border: 2.5px solid ${(props) => props.theme.accentColor};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 8px;
  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 14px;
    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
    &:focus {
      outline: none;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: lightgray;
`;

const SubmitButton = styled.button.attrs({ type: "submit" })`
  font-size: 36px;
  font-weight: 530;
  border: none;
  width: 14px;
  height: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.accentColor};
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

interface IWrapper {
  boardId: string;
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

  const deleteBoard = () => {
    setToDos((current) => {
      let copyBoard = { ...current };
      delete copyBoard[boardId];
      return copyBoard;
    });
  };

  return (
    <Wrapper boardId={boardId}>
      <Header>
        <Title>{boardId}</Title>
        <Button onClick={deleteBoard}>X</Button>
      </Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={"Add a new task"}
        />
        <SubmitButton>+</SubmitButton>
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
