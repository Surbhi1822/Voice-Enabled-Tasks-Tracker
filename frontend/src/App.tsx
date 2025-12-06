import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" theme="dark" />
    </div>
  );
};

export default App;