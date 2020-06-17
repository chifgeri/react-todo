import { Todo } from "./todo.dto";

export interface TodoList {
  id: number;
  name: string;
  todos: Todo[];
  priority: number;
  maxPlace: number;
}
