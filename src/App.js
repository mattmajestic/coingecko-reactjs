import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Show } from "./Pages/Show";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { useDarkMode } from "./Dark/UseDarkMode";
import { lightTheme, darkTheme } from "./Dark/Theme";
import Toggle from "./Dark/Toggle";
import { GlobalStyles } from "./Global";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [metaMaskAddress, setMetaMaskAddress] = useState('');

  const handleConnectMetaMask = () => {
    if (window.ethereum) {
      // Request MetaMask accounts
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          const address = accounts[0];
          setIsMetaMaskConnected(true);
          setMetaMaskAddress(address);
          console.log('MetaMask connected:', address);
        })
        .catch((error) => {
          console.log('Error connecting MetaMask:', error);
        });
    } else {
      console.log('MetaMask extension not detected');
    }
  };

  if (!componentMounted) {
    return <div />;
  }

  return (
    <>
      <div>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <div className="toggle-margin">
            <Toggle
              className="toggle"
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Show />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
