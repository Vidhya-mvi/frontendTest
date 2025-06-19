// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menus from "./pages/Menu";
import MenuDetails from "./pages/MenuDetail";
import Contact from "./pages/Contact";
import CreateMenu from "./components/CreateMenumodal";
import Header from "./components/Header";
import Footer from "./pages/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/:id" element={<MenuDetails />} />
          <Route path="/create" element={<CreateMenu />} />
        </Routes>
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
