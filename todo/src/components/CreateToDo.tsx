import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDostate } from "../atoms";

interface IForm {
  todo: string;
}

const CreateToDo = () => {
  const setTodos = useSetRecoilState(toDostate);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: category }, ...oldTodos]);
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
