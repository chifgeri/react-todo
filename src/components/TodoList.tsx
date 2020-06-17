import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import AddTodo from "./AddTodo";
import { Todo } from "../data/todo.dto";
import { TodoList as TList } from "../data/todolist.dto";

interface Props {
  list: TList;
  setTodos: (todos: TList) => void;
  moveBetweenLists: (todo: Todo, listID: number) => void;
  otherLists: { id: number; name: string }[];
}

const TodoList = (props: Props) => {
  const { todos, name, maxPlace } = props.list;
  const setTodos = props.setTodos;

  const sortTodos = (todoList: any) => {
    return todos.sort((a, b) => (a.place >= b.place ? 1 : -1));
  };

  const addTodo = (text: string) => {
    setTodos({
      ...props.list,
      todos: [
        ...todos,
        {
          text,
          done: false,
          id: Math.round(Math.random() * 100000),
          place: maxPlace,
        },
      ],
      maxPlace: maxPlace + 1,
    });
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
        setTodos({
          ...props.list,
          todos: [...list, { ...item, place: item.place + 1 }],
        });
      }
    }

    if (direction === "up") {
      // Find the todo over the item
      let upperItem = list.find((it) => it.place === item.place - 1);
      // When found switch the place value
      if (upperItem) {
        upperItem.place = item.place;
        setTodos({
          ...props.list,
          todos: [...list, { ...item, place: item.place - 1 }],
        });
      }
    }
  };

  const updateTodo = (todo: Todo) => {
    const oldVal = todos.find((it) => it.id === todo.id);
    let list = todos;
    let changedPlace = maxPlace;
    if (todo.done) {
      // When the place changes to -1 we should update the following todo's places
      if (oldVal) {
        list = list.map((item) => {
          if (item.place > oldVal.place) {
            item.place--;
          }
          return item;
        });
      }
      todo.place = -1;
      changedPlace = maxPlace - 1;
    } else {
      // When changed done to false, place it to the end of the list
      todo.place = maxPlace;
      changedPlace = maxPlace + 1;
    }
    setTodos({
      ...props.list,
      todos: [...list.filter((item) => item.id !== todo.id), todo],
      maxPlace: changedPlace,
    });
  };

  const removeTodo = (todo: Todo) => {
    setTodos({
      ...props.list,
      todos: [
        ...todos
          .filter((it) => it.id !== todo.id)
          .map((item) => {
            if (todo.place >= 1 && item.place > todo.place) {
              item.place--;
            }
            return item;
          }),
      ],
      maxPlace: todo.place >= 1 ? maxPlace - 1 : maxPlace,
    });
  };

  return (
    <div className="todo-list-container">
      <div className="list-name-span">
        <p className="list-name">{name}</p>
      </div>
      {sortTodos(todos).map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          onUpPress={() => {
            moveTodo(item, "up");
          }}
          onDownPress={() => {
            moveTodo(item, "down");
          }}
          last={item.place === todos.filter((t) => t.done === false).length}
          updateTodo={updateTodo}
          remove={removeTodo}
          otherLists={props.otherLists}
          moveBetweenLists={(listID: number) =>
            props.moveBetweenLists(item, listID)
          }
        />
      ))}
      <AddTodo onAdd={addTodo} />
    </div>
  );
};

export default TodoList;
