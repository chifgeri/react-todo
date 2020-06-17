import { TodoList } from "../data/todolist.dto";

export const postNewTodoList = (newList: TodoList) =>
  fetch("/todos", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ data: newList }),
  });

export const getAllTodoList = () => fetch("/todos");

export const putTodoList = (list: TodoList) =>
  fetch("/todos", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: list }),
  });
