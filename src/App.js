import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [Mode, setMode] = useState('light');

  const toggleMode = () => {
    if (Mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      document.title = 'Text-Editor DarkMode';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.title = 'Text-Editor LightMode';
    }
  };

  return (
    <>
      <Navbar title="Text Editor" mode={Mode} toggleMode={toggleMode} />
      <TextForm heading="Enter your Text Below!" />
    </>
  );
}

export default App;
