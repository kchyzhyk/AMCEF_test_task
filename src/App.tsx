import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";
import TodoListDetails from "./pages/TodoListDetails";

const repoName = "/AMCEF_test_task";

function App() {
  return (
    <TodoProvider>
      <BrowserRouter basename={repoName}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists/:id" element={<TodoListDetails />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
