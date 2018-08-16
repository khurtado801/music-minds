import React, { Component } from 'react';

class TourInfo extends Component {
    
	render() {
		let { displayName, location } = this.props;
		console.log('displayName:', displayName, 'location', location);
		return (
			<div>
				<p>Tour Info: {displayName}</p>
			</div>
		);
	}
}

export default TourInfo;