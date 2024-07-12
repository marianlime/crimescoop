import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/NavBar";
import RoutesPage from "./routes";
import "./styles/form.css";
import "./styles/navbar.css";
import "./styles/modal.css";
import "./styles/authorities.css";
import "./styles/searches.css"
import "./styles/button.css"
import "./styles/card.css"
import "./styles/forceDetails.css"
import "./styles/resources.css"


const App = () => {
  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>
        <RoutesPage />
      </div>
    </Router>
  );
};

export default App;
