import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
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
            <Link to='/protected'>Secret Data</Link>
          </li>
        </div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/protected' />
          <Route path='/login' component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
