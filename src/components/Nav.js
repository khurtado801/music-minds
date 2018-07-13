import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import Contact from '../views/Contact';
import Search from '../views/Search';
import './nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="wrapper">
                    <div className="header-wrapper">
                        <ul className="header">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/search">Search</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/Search" component={Search} />
                            <Route path="/About" component={About} />
                            <Route path="/Contact" component={Contact} />
                        </Switch>
                    </div>
            </div>
        );
    }
}

export default Nav;
