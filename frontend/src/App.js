import './App.css';
import TaskApp from './Components/TaskApp/TaskApp';
import Bg1 from './assets/images/bg1.avif'; 
import Bg2 from './assets/images/bg2.avif'; 
import Bg3 from './assets/images/bg3.jpg';
import Bg4 from './assets/images/bg4.jpg';
import Bg5 from './assets/images/bg5.jpg';
import { useState } from 'react';

function App() {
  const [bgImage, setBgImage] = useState(Bg1);

  const changeBg = (newBg) => {
    setBgImage(newBg);
  };

  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`
  };

  const backgrounds = [Bg1, Bg2, Bg3, Bg4, Bg5];

  return (
    <div className="App" style={backgroundStyle}>
      <TaskApp backgrounds={backgrounds} changeBg={changeBg} currentBg={bgImage}/>
    </div>
  );
}

export default App;