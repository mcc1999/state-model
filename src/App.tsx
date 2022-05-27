import { useModelState } from './core/hook';
import { commonModel } from './model/common.model';
import './App.css';

function App() {
  const { current } = useModelState(commonModel, 'current');
  return (
    <div className="App">
      A way of state management of React App: {current?.name}
    </div>
  );
}

export default App;
