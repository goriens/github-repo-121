import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Github } from "./components/Github";

function App() {
  return (
    <div className="App">
      <Github />
    </div>
  );
}

export default App;
