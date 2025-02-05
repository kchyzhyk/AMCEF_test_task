import { useTodo } from "../context/TodoContext";
import { useParams } from "react-router-dom";
import { Form } from "../components/Form";
import { TodoItem } from "../types";
import { useEffect, useState } from "react";
import moment from "moment";

const TodoListDetails = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>("");
  const {
    todoLists,
    toggleTodoItem,
    addTodoItem,
    deleteTodoItem,
    editTodoListItem,
  } = useTodo();
  const { id } = useParams<{ id: string }>();
  const list = todoLists.find((list) => list.id === id);

  useEffect(() => {
    if (!list) return;
    setTasks(list.items);
  }, [list]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "active") return !task.isCompleted;
    return true;
  });

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

  const handleToggle = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
    );
    const item = tasks.find((task) => task.id === taskId);
    editTodoListItem(id, taskId, {
      ...item,
      isCompleted: !item?.isCompleted || false,
    } as TodoItem);
    setTasks(updatedTasks);
    toggleTodoItem(id, taskId);
  };

  const startEditing = (item: TodoItem) => {
    setEditingId(item.id);
    setEditedDescription(item.description);
  };

  const handleSaveDescription = (listId: string, itemId: string) => {
    const item = tasks.find((task) => task.id === itemId);
    editTodoListItem(listId, itemId, {
      ...item,
      description: editedDescription || "",
    } as TodoItem);

    if (list) {
      list.items = list.items.map((item) =>
        item.id === itemId ? { ...item, description: editedDescription } : item,
      );
    }

    setEditingId(null); // Exit edit mode
  };
  const handleFilterChange = (newFilter: "all" | "active" | "completed") => {
    setFilter(newFilter);
  };

  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const dateFormat = (dateString: string) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm a");
  };

  if (!list) return <div>List not found</div>;

  return (
    <div className="flex flex-col p-5 w-screen h-screen">
      <div className="flex flex-row justify-between border-b items-center w-full p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {list.name}
        </h1>

        {/* Progress Bar */}
        <div className=" bg-gray-200 rounded-full w-50  h-2.5 mb-4">
          <div
            className="bg-teal-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="flex justify-between text-xs text-teal-600 font-medium">
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Form Component */}
        <Form addTodo={addTodo} />
      </div>

      <div className="mt-2">
        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-teal-500 text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("active")}
            className={`px-4 py-2 rounded-md ${filter === "active" ? "bg-teal-500 text-white" : "bg-gray-200"}`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`px-4 py-2 rounded-md ${filter === "completed" ? "bg-teal-500 text-white" : "bg-gray-200"}`}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 w-full">
        {filteredTasks.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col p-4 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all w-full"
            >
              {/* Title & Checkbox */}
              <div className="flex items-center justify-between">
                <h3
                  className={`text-lg font-semibold ${
                    item.isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(item.id)}
                  className="h-5 w-5 text-teal-600 accent-teal-500 cursor-pointer"
                />
              </div>

              {editingId === item.id ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onBlur={() => handleSaveDescription(list.id, item.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSaveDescription(list.id, item.id)
                  }
                  autoFocus
                  className="mt-1 text-sm text-gray-800 border-b border-teal-500 focus:outline-none w-full"
                />
              ) : (
                <p
                  className="text-sm text-gray-600 mt-1 cursor-pointer hover:text-gray-800"
                  onClick={() => startEditing(item)}
                >
                  {item.description || "Click to add a description..."}
                </p>
              )}

              {/* Deadline */}
              <p className="text-xs text-gray-500 mt-2">
                🕒 Deadline:{" "}
                <span className="font-medium text-gray-700">
                  {item.deadline ? dateFormat(item.deadline) : "No deadline 🎉"}
                </span>
              </p>

              {/* Delete Button */}
              <button
                onClick={() => deleteTodoItem(list.id, item.id)}
                className="mt-3 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoListDetails;
