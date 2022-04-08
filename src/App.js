import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './Navbar'
import Users from './Users'
function App() {
  return (
    <Router>
      <Navbar />
      <Users />
    </Router>
  );
}

export default App;
