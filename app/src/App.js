import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './App.css';

import Main from './components/Main';
import Expense from './components/Expense';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <header className="text-center App-header">
              <h1 className="col-12">Utility Dashboard</h1>
              <nav className="mt-5 container">
                <ul className="nav nav-tabs nav-fill">
                  <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to='/'>Usage</NavLink></li>
                  <li className="nav-item"><NavLink to='/expense' className="nav-link" activeClassName="active">Expense</NavLink></li>
                </ul>
              </nav>
            </header>

            <div className="main container">

                <Route path="/" exact component={Main} />
                <Route path="/expense" component={Expense} />
              
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
