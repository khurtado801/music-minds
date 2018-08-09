import React, { Component } from 'react';
import '../styles/album-item.css';

class AlbumItem extends Component {
    
	render() {
		let { strAlbum } = this.props;
		return (
			<div className="strAlbum-wrapper">
				<div className="search-item">
					<div className="search-txt">
						<h3>Album name: {strAlbum}</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default AlbumItem;