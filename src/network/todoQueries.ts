import { TodoList } from "../data/todolist.dto";

export const postNewTodoList = (newList: TodoList) =>
  fetch("http://localhost:8000/todos", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ data: newList }),
  });

export const getAllTodoList = () => fetch("http://localhost:8000/todos");

export const putTodoList = (list: TodoList) =>
  fetch("http://localhost:8000/todos", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: list }),
  });
