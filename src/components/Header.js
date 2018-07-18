import React, { Component } from 'react';
import '../styles/header.css';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="header-wrapper">
					<div className="title-wrapper">
						<h1>Welcome To Music Minds - A Place For The Music Minded </h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
