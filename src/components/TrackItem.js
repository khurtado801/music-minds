import React, { Component } from 'react';
import '../styles/index.css';

class TrackItem extends Component {
    
	render() {
		let { strAlbum, name, artist } = this.props;
		return (
			<div className="search-item">
				<div className="search-txt">
					<h4>Artist Name: {artist}</h4>
					<h4>Album Name: {strAlbum}</h4>
					<h4>Track Name: {name}</h4>
				</div>
			</div>
		);
	}
}

export default TrackItem;