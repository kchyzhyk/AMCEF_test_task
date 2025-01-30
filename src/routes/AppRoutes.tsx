import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:id" element={<TodoListPage />} />
        <Route path="/list/:id/item/:itemId" element={<TodoDetailsPage />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
