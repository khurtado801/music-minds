import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="push">
                <div className="footer">
                    <div className="contact-items-wrapper">
                        <h3>
                            <a href="https://www.linkedin.com/in/khurtado801/">
                                <i className="glyphicon glyphicon-pencil" />LinkedIn
                            </a>
                            <a href="https://github.com/khurtado801/Web-Dev-Projects">
                                <i className="glyphicon glyphicon-cloud" />GitHub
                            </a>
                            <a href="https://drive.google.com/open?id=1rAKLHbC4GLqc17S4YTQwpQY2A9Edmj1o">
                                <i className="glyphicon glyphicon-list-alt" />My Resume
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
