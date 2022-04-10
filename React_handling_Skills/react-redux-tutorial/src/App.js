import Counter from "./components/Counter"
import Todos from "./components/Todo";

const App = () => {
  return (
    <div>
      <Counter number={0} />
      <hr />
      <Todos />
    </div>
  );
};

export default App;