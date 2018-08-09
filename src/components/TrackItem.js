import React, { Component } from 'react';
import '../styles/track-item.css';

class TrackItem extends Component {
    
	render() {
		let { strAlbum, name, artist } = this.props;
		return (
			<div className="track-wrapper">
				<div className="track-item">
					<div className="track-txt">
						<h3>Artist Name: {artist}</h3>
						<h3>Album Name: {strAlbum}</h3>
						<h3>Track Name: {name}</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default TrackItem;