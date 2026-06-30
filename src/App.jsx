import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Translator from "./pages/Translator";
import PasswordGenerator from "./pages/PasswordGenerator";

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">

      {/* Background glow circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10"></div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Translator />} />
          <Route path="/password" element={<PasswordGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;