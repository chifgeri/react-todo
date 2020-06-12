import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import AddTodo from "./AddTodo";

interface Props {}

const TodoList = (props: Props) => {
  const [todos, setTodos] = useState([
    {
      text: "asdasd",
      id: 1,
      place: 1,
      done: false,
    },
  ]);

  const sortTodos = (todoList: any) => {
    return todos.sort((a, b) => (a.place >= b.place ? 1 : 0));
  };

  const addTodo = (text: string) => {
    const maxPlace = sortTodos(todos)[todos.length - 1].place;
    console.log(maxPlace);
    setTodos([
      ...todos,
      { text, done: false, id: maxPlace + 1, place: maxPlace + 1 },
    ]);
  };

  const moveTodo = (item: any, direction: string) => {
    // get todos without this item
    let list = todos.filter((it) => it.id !== item.id);
    if (direction === "down") {
      // Find the todo under the item
      let downItem = list.find((it) => it.place === item.place + 1);
      // When found switch the place value
      if (downItem) {
        downItem.place = item.place;
        setTodos([...list, { ...item, place: item.place + 1 }]);
      }
    }

    if (direction === "up") {
      // Find the todo over the item
      let upperItem = list.find((it) => it.place === item.place - 1);
      // When found switch the place value
      if (upperItem) {
        upperItem.place = item.place;
        setTodos([...list, { ...item, place: item.place - 1 }]);
      }
    }
  };

  return (
    <div className="todo-list-container">
      <div className="list-name-span">
        <p className="list-name">Todo list</p>
      </div>
      {sortTodos(todos).map((item) => (
        <TodoItem
          text={item.text}
          onUpPress={() => {
            moveTodo(item, "up");
          }}
          onDownPress={() => {
            moveTodo(item, "down");
          }}
        />
      ))}
      <AddTodo onAdd={addTodo} />
    </div>
  );
};

export default TodoList;
