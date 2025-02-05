import { Link } from "react-router-dom";
import { TodoList } from "../types";

const TodoListComponent = ({
  list,
  removeTodoList,
  openModal,
}: {
  list: TodoList;
  removeTodoList: (id: string) => void;
  openModal: (list: TodoList) => void;
}) => {
  return (
    <>
      <div
        key={list.id}
        className="w-80 border shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-4 bg-gray-100 font-bold text-lg flex flex-row justify-between">
          <div> {list.name}</div>
          <button
            onClick={() => openModal(list)}
            className="text-yellow-500 hover:text-yellow-700"
          >
            Edit
          </button>
        </div>

        <div className="p-4">Todos: {list.items.length}</div>
        <div className="p-4 flex justify-between bg-gray-50">
          <Link
            to={`/lists/${list.id}`}
            className="text-blue-500 hover:underline"
          >
            View List
          </Link>
          <button
            onClick={() => removeTodoList(list.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoListComponent;
