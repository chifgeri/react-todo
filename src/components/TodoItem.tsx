import React from "react";
import "./TodoItem.css";
import { Todo } from "../data/todo.dto";

interface Props {
  onUpPress: () => void;
  onDownPress: () => void;
  todo: Todo;
  last: boolean;
  updateTodo: (todo: Todo) => void;
}

const TodoItem = (props: Props) => {
  return (
    <div className="todo-container">
      <input
        type="checkbox"
        value={props.todo.done ? 1 : 0}
        onChange={() => {
          props.updateTodo({
            ...props.todo,
            done: !props.todo.done,
          });
        }}
      />
      {props.todo.text}
      <div>
        <input
          type="button"
          onClick={() => {
            props.onUpPress();
          }}
          disabled={props.todo.done || props.todo.place <= 1}
          value="Up"
        />
        <input
          type="button"
          onClick={() => {
            props.onDownPress();
          }}
          disabled={props.todo.done || props.last}
          value="Down"
        />
      </div>
    </div>
  );
};

export default TodoItem;
