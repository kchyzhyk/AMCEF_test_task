import { useTodo } from "../context/TodoContext";
import { useParams } from "react-router-dom";
import { Form } from "../components/Form";
import { TodoItem } from "../types";
import { useEffect, useState } from "react";
import { fetchListItems } from "../services/api";

const TodoListDetails = () => {
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const { todoLists, toggleTodoItem, addTodoItem, deleteTodoItem } = useTodo();
  const { id } = useParams<{ id: string }>();
  const list = todoLists.find((list) => list.id === id);

  useEffect(() => {
    if (id) {
      getTasks(id);
    }
  }, [id]);

  const addTodo = (todo: {
    title: string;
    description: string;
    deadline: string;
  }) => {
    if (!id) return;

    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      ...todo,
      isCompleted: false,
      listId: id,
    };

    setTasks((prevTasks) => [...prevTasks, newTodo]);
    addTodoItem(id, newTodo);
  };

  const getTasks = (listId: string) => {
    fetchListItems(listId)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  };

  const handleToggle = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
    );
    setTasks(updatedTasks);
    toggleTodoItem(id, taskId);
  };

  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  if (!list) return <div>List not found</div>;

  return (
    <div className="flex flex-col min-h-screen p-5">
      <div className="flex flex-col items-center w-full p-4 rounded-md bg-white shadow-md flex-1">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {list.name}
        </h1>

        {/* Form Component */}
        <Form addTodo={addTodo} />

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-teal-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-teal-600 font-medium">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <ul className="mt-4 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
          {tasks.map((item: TodoItem) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(item.id)}
                  className="h-4 w-4 text-teal-600"
                />
                <span
                  className={`flex-1 ${
                    item.isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {item.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodoItem(list.id, item.id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded-md transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoListDetails;
