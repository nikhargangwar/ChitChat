import React from "react";
import './App.css';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {

  const [{user},dispatch]=useStateValue();

  return (

    //BEM naming Convesntion
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_parentBody">
          <h4> WhatsApp Clone</h4>
         
             <div className="app_body">
          <Router>
            {/* {sidebar} */}
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                {/* {chat} */}
                <Chat />
              </Route>
              <Route path="/">
              </Route>
            </Switch>
          </Router>


        </div>

        </div>
     

      )}


    </div>

  );
}

export default App;
