import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-4xl font-bold text-white">
                Welcome to Task Manager
              </h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
