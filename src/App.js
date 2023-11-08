import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GroupNotes from './Components/navigate/GroupNotes';
import Notes from './Components/main/Notes';

import Home from './pages/Home';

function App() {
  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<Notes />} />
        
        <Route path="/GroupNotes/:groupName" element={<GroupNotes />} />
      </Routes>
    </>
  );
}

export default App;
