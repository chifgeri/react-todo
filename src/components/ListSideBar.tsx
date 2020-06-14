import React, { useState } from "react";
import { TodoList } from "../data/todolist.dto";
import "./ListSideBar.css";

interface Props {
  list: TodoList[];
}

const ListSideBar = (props: Props) => {
  const [hoverItem, setHoverItem] = useState<number | null>();
  return (
    <div className="side-bar-container">
      {props.list.map((item) => (
        <div
          className="side-bar-item"
          onMouseEnter={() => {
            setHoverItem(item.id);
          }}
          onMouseLeave={() => {
            setHoverItem(null);
          }}
        >
          <p>{item.name}</p>
          {item.id === hoverItem && (
            <div>
              <input type="button" onClick={() => {}} value="Up" />
              <input type="button" onClick={() => {}} value="Down" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListSideBar;
