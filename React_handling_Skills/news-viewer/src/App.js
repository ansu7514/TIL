import { useCallback, useState } from "react";
import Categoreis from "./components/Categories";
import NewsList from "./components/NewsList";

const App = () => {
  const [category, setCartegory] = useState('all');
  const onSelect = useCallback(category => setCartegory(category), []);

  return (
    <>
      <Categoreis category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </>
  );
};

export default App;