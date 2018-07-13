import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-wrapper">
                    <div className="title-wrapper">
                        <p>Hello, World!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
