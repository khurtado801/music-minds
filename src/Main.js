import React, { Component } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <Nav />
                <Footer />
            </div>
        );
    }
}

export default Main;
