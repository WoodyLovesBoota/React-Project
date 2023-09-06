import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Wrapper = styled.div<IWrapper>`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  width: 303px;
  min-height: 180px;
  margin-right: 20px;
  padding: 23px 15px 15px 15px;
  display: flex;
  flex-direction: column;

  box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    width: ${(props) => props.boardId === "TrashLILI" && "200px"};
    height: ${(props) => props.boardId === "TrashLILI" && "220px"};
    Span {
      font-size: 80px;
      color: #f0f08c;
    }
    transition: all 0.5s ease-in-out;
  }

  Form {
    display: ${(props) => props.boardId === "TrashLILI" && "none"};
    border: ${(props) => props.boardId === "TrashLILI" && "none"};
  }

  ${(props) =>
    props.boardId === "TrashLILI" && {
      width: "140px",
      height: "160px",
      position: "fixed",
      top: "-40px",
      right: "-10px",
      boxShadow: "none",
      padding: 0,
      margin: 0,
      borderBottomLeftRadius: "160px",
      backgroundColor: props.theme.accentColor,
    }}
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 800;
  font-size: 18px;
`;

const Area = styled.div<IDragging>`
  background-color: transparent;
  flex-grow: 1;
`;

const Span = styled.span<IWrapper>`
  display: block;
  font-size: 50px;
  color: white;
  position: fixed;
  top: 30px;
  right: 30px;
  transition: all 0.5s ease-in-out;
  display: ${(props) => props.boardId !== "TrashLILI" && "none"};
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
        <Title>{boardId === "TrashLILI" ? "" : boardId}</Title>
        <Button onClick={deleteBoard}>X</Button>
      </Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={"Add a new task"}
          autoComplete="off"
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
      {boardId === "TrashLILI" && (
        <Span boardId={boardId}>
          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
        </Span>
      )}
    </Wrapper>
  );
};

export default Board;
