import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route element={<Cart />} path="/"></Route>
            <Route element={<NotFound />} path="*"></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
