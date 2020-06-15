import React, { useState, useEffect } from "react";
import { TodoList as TList } from "../data/todolist.dto";
import ListSideBar from "./ListSideBar";
import TodoList from "./TodoList";
import "./ListContainer.css";
import { Todo } from "../data/todo.dto";

interface Props {}

const ListContainer = (props: Props) => {
  const [todoLists, setTodoLists] = useState<TList[]>([]);
  const [maxPriority, setMaxPriority] = useState<number>(todoLists.length);

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        setTodoLists(json.data);
      });
  }, []);

  useEffect(() => {
    setMaxPriority(todoLists.length + 1);
  }, [todoLists]);

  const addTodoList = (name: string) => {
    const newList = {
      name,
      todos: [],
      id: Math.round(Math.random() * 10000),
      priority: maxPriority,
    };

    setTodoLists([...todoLists, newList]);

    fetch("http://localhost:8000/todos", {
      method: "POST",
      body: new Blob([JSON.stringify({ data: newList }, null, 2)], {
        type: "application/json",
      }),
    });
  };

  const updateTodos = (item: TList, todos: Todo[]) => {
    const todoList = { ...item, todos };
    setTodoLists([...todoLists.filter((it) => item.id !== it.id), todoList]);
    fetch("http://localhost:8000/todos", {
      method: "PUT",
      body: new Blob([JSON.stringify({ data: todoList }, null, 2)], {
        type: "application/json",
      }),
    });
  };

  const moveTodoList = (item: TList, direction: string) => {
    // get todos without this item
    let list = todoLists.filter((it) => it.id !== item.id);
    if (direction === "down") {
      // Find the todo under the item
      let downItem = list.find((it) => it.priority === item.priority + 1);
      // When found switch the place value
      if (downItem) {
        downItem.priority = item.priority;
        setTodoLists([...list, { ...item, priority: item.priority + 1 }]);
      }
    }

    if (direction === "up") {
      // Find the todo over the item
      let upperItem = list.find((it) => it.priority === item.priority - 1);
      // When found switch the place value
      if (upperItem) {
        upperItem.priority = item.priority;
        setTodoLists([...list, { ...item, priority: item.priority - 1 }]);
      }
    }
  };

  return (
    <div className="list-container">
      <ListSideBar
        list={todoLists}
        addNewList={(n) => {
          addTodoList(n);
        }}
        moveList={(item, direction) => {
          moveTodoList(item, direction);
        }}
      />
      <div className="todo-lists">
        {todoLists
          .sort((a, b) => (a.priority > b.priority ? 1 : -1))
          .map((item) => (
            <TodoList
              key={item.id}
              list={item}
              setTodos={(todos) => updateTodos(item, todos)}
            />
          ))}
      </div>
    </div>
  );
};

export default ListContainer;
