import './App.css';
import TaskApp from './Components/TaskApp/TaskApp';
import Bg1 from './assets/images/bg1.avif'; // Ensure the path is correct

function App() {
  const backgroundStyle = {
    backgroundImage: `url(${Bg1})`
  };

  return (
    <div className="App" style={backgroundStyle}>
      <TaskApp />
    </div>
  );
}

export default App;
