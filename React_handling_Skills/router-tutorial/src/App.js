import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import About from './pages/About';
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
