import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='navBar'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='protected'>Secret Data</Link>
          </li>
        </div>
        <Switch>
          <Route path='/'/>
          <Route exact path='/protected' />
          <Route exact path='/login' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
