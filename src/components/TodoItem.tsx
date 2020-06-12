import React from "react";
import "./TodoItem.css";

interface Props {
  text: string;
}

const TodoItem = (props: Props) => {
  return (
    <div className="todo-container">
      <input type="checkbox" />
      {props.text}
      <div>
        <input type="button" onClick={() => {}} value="Up" />
        <input type="button" onClick={() => {}} value="Down" />
      </div>
    </div>
  );
};

export default TodoItem;
