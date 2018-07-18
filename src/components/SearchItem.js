import React, { Component } from 'react';

class SearchItem extends Component {
    
	render() {
		let { strAlbum, name, artist } = this.props;
		return (
			<div className="search-item">
				<div className="search-txt">
					<h4>Album: {strAlbum}</h4>
					<h4>Artist: {artist}</h4>
					<h4>Track Name: {name}</h4>
				</div>
			</div>
		);
	}
}

export default SearchItem;