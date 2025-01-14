// import { useState } from 'react'
import { useForm } from 'react-hook-form'
/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */
/* interface IForm {
  [key: string]: string
} */
interface IForm {
  email: string
  firstName?: string
  lastName?: string
  userName: string
  password: string
  passwordConfirm: string
  extraError?: string
}
function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues
  } = useForm<IForm>({
    defaultValues: {
      email: '@gmail.com'
    }
  })

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'Passwords are not the same' }, { shouldFocus: true })
    }
    /*If network or server has a problem */
    //setError('extraError', { message: 'Server offline.' })
  }

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@+[A-Za-z]+.com$/,
              message: 'This is not valid email format'
            }
          })}
          placeholder='Email'
        />
        <span>
          {errors.email?.message}
          {/* errors?.email?.message as string :without interface*/}
        </span>
        <input {...register('firstName', { required: false })} placeholder='First Name' />
        <span>
          {errors.firstName?.message}
          {/* errors?.firstName?.message as string :without interface*/}
        </span>
        <input {...register('lastName', { required: false })} placeholder='Last Name' />
        <span>
          {errors.lastName?.message}
          {/* errors?.lastName?.message as string :without interface*/}
        </span>
        <input
          {...register('userName', { required: 'User name is required', minLength: { value: 10, message: 'Your user name is too short' } })}
          placeholder='User Name'
        />
        <span>
          {errors.userName?.message}
          {/* errors?.username?.message as string :without interface*/}
        </span>
        <input
          {...register('password', {
            required: 'Password is required',
            validate: {
              noUserName: (value) => (value.includes(getValues('userName')) ? "Password can't include your user name" : true)
            }
          })}
          placeholder='Password'
        />
        <span>
          {errors.password?.message}
          {/* errors?.password?.message as string :without interface*/}
        </span>
        <input {...register('passwordConfirm', { required: 'Confirm your password' })} placeholder='Confirm Password' />
        <span>
          {errors.passwordConfirm?.message}
          {/* errors?.passwordConfirm?.message as string :without interface*/}
        </span>
        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  )
}

export default ToDoList
