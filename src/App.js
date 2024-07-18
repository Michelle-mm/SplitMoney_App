import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from './components/Navbar';
import {Home, Friends, Splits, Settings, History} from './components/';
import {useStateContext} from "./contexts/ContextProvider";
const App = () => {
  const {themeColor} = useStateContext();
  return (
    <BrowserRouter>
      <div className="App flex flex-col">
        <div className="flex flex-col lg:flex-row relative overflow-auto">
          <nav>
            <Navbar />
          </nav>
          <main className="grow w-full lg:w-2/3 min-h-dvh">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/splits" element={<Splits />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
