import { Route, Routes } from "react-router-dom";
import Menu from './components/Menu';
import RedPage from "./page/RedPage";
import BluePage from "./page/BluePage";

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage />} />
        <Route path="/blue" element={<BluePage />} />
      </Routes>
    </div>
  );
};

export default App;