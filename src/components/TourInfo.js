import React, { Component } from 'react';
import '../styles/tour-info.css';

class TourInfo extends Component {
	render() {
		let { displayName } = this.props;

		return (
			<div className="tour-wrapper">
				<div className="tour-txt">
					<h4>Tour Info: {displayName}. {this.props.location.city}</h4>
				</div>
			</div>
		);
	}
}

export default TourInfo;