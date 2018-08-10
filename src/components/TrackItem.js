import React, { Component } from 'react';
import '../styles/track-item.css';

class TrackItem extends Component {
    
	render() {
		let { strAlbum, name, artist } = this.props;
		return (
			<div className="track-wrapper">
				<div className="track-item">
					<div className="track-txt">
						<h4>Artist Name: {artist}</h4>
						<h4>Album Name: {strAlbum}</h4>
						<h4>Track Name: {name}</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default TrackItem;