import { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (token === null || token === undefined || token === "") {
    return <AuthPage setToken={
      (e) => {
        setToken(e);
        localStorage.setItem('token', e);
      }
    } />;
  }

  return (
    <div className="App">
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default App;
