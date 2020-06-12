import React from "react";
import "./TodoItem.css";

interface Props {
  text: string;
  onUpPress: () => void;
  onDownPress: () => void;
}

const TodoItem = (props: Props) => {
  return (
    <div className="todo-container">
      <input type="checkbox" />
      {props.text}
      <div>
        <input
          type="button"
          onClick={() => {
            props.onUpPress();
          }}
          value="Up"
        />
        <input
          type="button"
          onClick={() => {
            props.onDownPress();
          }}
          value="Down"
        />
      </div>
    </div>
  );
};

export default TodoItem;
