import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Shareholders from './components/Shareholders';
import './App.css';
import './css/bootstrap.css';

class App extends React.Component {
  render() {
    return (
<Router>
        <div>
          <div className="App">
            <header className="App-header">
              <img src='logo.png' className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to SmartShares</h1>
              <div className="row text-center">
                <div className="col-md-3 col-sm-3"><a href="https://www.smartshares.biz/">Home</a></div>
                <div className="col-md-3 col-sm-3"><Link to="/signup">Sign Up</Link></div>
                <div className="col-md-3 col-sm-3"><Link to="/signin">Sign In</Link></div>
                <div className="col-md-3 col-sm-3"><Link to="/shareholders">Shareholders</Link></div>
              </div>
            </header>
          </div>

          <hr/>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup/*" element={<SignUp/>}/>
            <Route path="/signin/*" element={<SignIn/>}/>
            <Route path="/shareholders/*" element={<Shareholders/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
