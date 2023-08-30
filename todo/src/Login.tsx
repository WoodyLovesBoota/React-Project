import { useState } from "react";
import { useForm } from "react-hook-form";

// const TodoList = () => {
//   const [todo, setTodo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={todo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

interface IForm {
  errors: {
    email: {
      message: string;
    };
  };
  email: string;
  username: string;
  name: string;
  password: string;
  password1: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "Password are not same" }, { shouldFocus: true });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "email is needed",
            pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "no match" },
          })}
          placeholder="Write a Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("name", {
            required: true,
            validate: { noWoody: (value) => (value.includes("woody") ? "woody no allowed" : true) },
          })}
          placeholder="Write a Name"
        />
        <span>{errors?.name?.message}</span>

        <input
          {...register("username", { required: true, minLength: 10 })}
          placeholder="Write a Username"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register("password", { required: "Password Is Required" })}
          placeholder="Write a Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("password1", { required: "Password Is Required" })}
          placeholder="Write a Password"
        />
        <span>{errors?.password1?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
