import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../styles/index.css';

const Greeting = () => {
	return (
		<div>
			<Jumbotron className="jumbotron">
				<h3 className="lead">This is a simple app, that allows you to find albums based on your favorite artist.</h3>
				<h4>You can also find artist and album related info of a song just by entering the name in the search field below.</h4>
				<p className="lead">
				</p>
			</Jumbotron>
		</div>
	);
};

export default Greeting;