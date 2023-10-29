import React from 'react';
import { AddService } from './service/AddService';
import { AddEvent } from './events/AddEvent';
import { EditEvent } from './events/EditEvent';

import { AddPackges } from './packges/AddPackges';
import { Packges } from './packges/Packges';
import { Events } from './events/Events';
import { Providers } from './provider/Providers';

import { AddProvider } from "./provider/AddProvider"
import { ThePackge } from './packges/ThePackge';
import { ThePackgeView } from './packges/ThePackgeView';

import { Home } from './Home';
import { Login } from './Login';


import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { EditProvider } from './provider/EditProvider';
import { Services } from './service/Services';
import { EditService } from './service/EditService';
import { EditPackage } from './packges/EditPackage';
const browserHistory = createBrowserHistory();
function mobileMenu(e) {
    console.log("15===");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
function closeMenu(e) {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

function test(params) {
    Meteor.call("addReviewToEvent", { userId: "25q5L8xxgiAqiZFvd", comment: "sdasdsad", rate: 4, eventId: "kqjAPYsSAhF2RdEja" })
}
function checkUser() {

    if (Meteor.userId()) {
        return (
            <div style={{ display: "contents", fontFamily: 'Cairo, sans-serif' }}>
                <header className="header">
                    <nav className="navbar" style={{ padding: "25px" }}>
                        <div className='container'>
                            <Link to="/" className="nav-logo" onClick={() => { test() }}>
                                <img src='/logo.png' width="120px" />
                            </Link>
                            <ul className="nav-menu">
                                <li className="nav-item">
                                    <Link to="/services" className="nav-link" onClick={closeMenu.bind(this)}>Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/allTheEvents" className="nav-link" onClick={closeMenu.bind(this)}>Events</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/allpackges" className="nav-link" onClick={closeMenu.bind(this)}>Packages</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/providers" className="nav-link" onClick={closeMenu.bind(this)}>providers</Link>
                                </li>


                            </ul>
                            <div className="hamburger" onClick={mobileMenu.bind(this)}>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </div>
                    </nav>
                </header>
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/services" component={Services} />
                    <Route exact path="/addService" component={AddService} />
                    <Route exact path="/editservice/:id" component={EditService} />

                    <Route exact path="/addEvent" component={AddEvent} />
                    <Route exact path="/EditEvent/:id" component={EditEvent} />

                    <Route exact path="/addPackages" component={AddPackges} />
                    <Route exact path="/editPackage/:id" component={EditPackage} />

                    <Route exact path="/allpackges" component={Packges} />
                    <Route exact path="/allTheEvents" component={Events} />
                    <Route exact path="/addprovider" component={AddProvider} />
                    <Route exact path="/editprovider/:id" component={EditProvider} />

                    <Route exact path="/providers" component={Providers} />

                    <Route path="/packge/:id" component={(props) => <ThePackge {...props} />} />
                    <Route path="/packgeView/:id" component={(props) => <ThePackgeView {...props} />} />




                </Switch>
            </div>
        )
    } else {
        return (
            <Route exact to="/" component={Login} />
        )
    }
}
export const App = () => (
    <div>

        <BrowserRouter>

            {checkUser()}
        </BrowserRouter>
    </div>
);
