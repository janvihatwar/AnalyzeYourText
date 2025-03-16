import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Alert from './components/Alert'
import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1400);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
      showAlert("Dark mode enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = '#f8f9fa';
      document.body.style.color = '#212529';
      showAlert("Light mode enabled", "success");
    }
  }

  return (
    <Router>
      <div className="App">
      <Navbar title="Text Analyzer" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<Body mode={mode} showAlert={showAlert} />} />
            {/* Add more routes here if needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
