import { Route, Routes } from "react-router-dom";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<Article />} />
    </Routes>
  );
};

export default App;
