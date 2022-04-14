import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Users from './Users';
import Songs from './AddSong';
import SongDetail from './SongDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Users />} />
        <Route exact path='/create' element={<Songs />} />
        <Route exact path='/update/:id' element={<SongDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
