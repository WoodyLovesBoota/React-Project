import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDostate } from "../atoms";

interface IForm {
  todo: string;
}

const CreateToDo = () => {
  const setTodos = useSetRecoilState(toDostate);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: "TODO" }, ...oldTodos]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("todo", {
          required: "Please wirte a to do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
