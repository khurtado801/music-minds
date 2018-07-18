import React, { Component } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

import './styles/index.css';

class Main extends Component {
	render() {
		return (
			<div className="main-wrapper">
				<Header />
				<Nav />
				<Footer />
			</div>
		);
	}
}

export default Main;
